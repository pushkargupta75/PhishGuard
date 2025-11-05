from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import pickle
import json
import re
import os
from pathlib import Path
from datetime import datetime
from sqlalchemy.orm import Session

# Import database and auth
import sys
backend_path = str(Path(__file__).parent.parent)
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from database import get_db, User, ScanHistory, init_db
from auth import create_access_token, get_current_user


# Request models
class URLRequest(BaseModel):
    url: str


class EmailRequest(BaseModel):
    emailText: str


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserUpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None


# Create FastAPI app
app = FastAPI(
    title="PhishGuard API",
    description="Real-time Phishing Detection Backend",
    version="1.0.0"
)

# Add CORS middleware - Added Vite default port
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("🔍 Loading phishing detection models...")

# Initialize database
init_db()

# Get the absolute path to the models directory
current_dir = Path(__file__).parent
models_dir = current_dir.parent / "models"

# Load your existing models with absolute paths
try:
    with open(models_dir / 'url_model.pkl', 'rb') as f:
        url_model = pickle.load(f)

    with open(models_dir / 'email_model.pkl', 'rb') as f:
        email_model = pickle.load(f)

    with open(models_dir / 'url_features.json', 'r') as f:
        url_features = json.load(f)

    with open(models_dir / 'email_features.json', 'r') as f:
        email_features = json.load(f)

    print("✅ All models loaded successfully!")
except FileNotFoundError as e:
    print(f"❌ Error loading models: {e}")
    print(f"   Models directory: {models_dir}")
    raise


def extract_url_features(url):
    """Extract features from URL matching the trained model"""
    url_str = str(url)
    
    # Extract domain for domain_length calculation
    domain = url_str
    if '://' in url_str:
        domain = url_str.split('://')[1]
    if '/' in domain:
        domain = domain.split('/')[0]
    
    # Check if URL contains IP address
    has_ip = 1 if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', url_str) else 0
    
    return {
        'url_length': len(url_str),
        'num_dots': url_str.count('.'),
        'num_hyphens': url_str.count('-'),
        'num_underscore': url_str.count('_'),
        'num_slash': url_str.count('/'),
        'num_question': url_str.count('?'),
        'num_equal': url_str.count('='),
        'num_ampersand': url_str.count('&'),
        'num_at': url_str.count('@'),
        'num_digits': sum(c.isdigit() for c in url_str),
        'has_https': 1 if url_str.startswith('https') else 0,
        'has_http': 1 if url_str.startswith('http') else 0,
        'suspicious_words': sum(
            1 for word in ['login', 'verify', 'security', 'account', 'password'] if word in url_str.lower()),
        'has_ip': has_ip,
        'domain_length': len(domain)
    }


def extract_email_features(email_text):
    """Extract features from email text matching the trained model"""
    text_str = str(email_text)
    
    # Count sentences (split by . ! ?)
    num_sentences = len(re.split(r'[.!?]+', text_str.strip())) - 1
    if num_sentences < 1:
        num_sentences = 1
    
    # Calculate uppercase ratio
    num_uppercase = sum(1 for c in text_str if c.isupper())
    num_letters = sum(1 for c in text_str if c.isalpha())
    uppercase_ratio = num_uppercase / num_letters if num_letters > 0 else 0
    
    return {
        'text_length': len(text_str),
        'num_words': len(text_str.split()),
        'num_sentences': num_sentences,
        'num_special_chars': sum(1 for c in text_str if not c.isalnum() and not c.isspace()),
        'num_exclamation': text_str.count('!'),
        'num_question': text_str.count('?'),
        'num_dollar': text_str.count('$'),
        'num_uppercase': num_uppercase,
        'uppercase_ratio': uppercase_ratio,
        'has_urgency': 1 if any(word in text_str.lower() for word in ['urgent', 'immediately', 'asap', 'hurry', 'quick', 'now']) else 0,
        'has_threat': 1 if any(word in text_str.lower() for word in ['suspend', 'terminate', 'close', 'locked', 'banned', 'restricted']) else 0,
        'has_reward': 1 if any(word in text_str.lower() for word in ['winner', 'prize', 'reward', 'congratulations', 'won', 'free']) else 0,
        'has_security': 1 if any(word in text_str.lower() for word in ['password', 'login', 'verify', 'security', 'account', 'confirm']) else 0
    }


def highlight_suspicious_url(url):
    """Highlight suspicious parts in URL"""
    suspicious_words = ['login', 'verify', 'security', 'account', 'password']
    highlighted = url
    for word in suspicious_words:
        if word in url.lower():
            highlighted = highlighted.replace(word, f"**{word}**")
    return highlighted


def highlight_suspicious_email(email_text):
    """Highlight suspicious parts in email"""
    suspicious_words = ['urgent', 'immediately', 'winner', 'prize', 'verify', 'password']
    highlighted = email_text
    for word in suspicious_words:
        if word in email_text.lower():
            highlighted = highlighted.replace(word, f"**{word}**")
    return highlighted


def generate_explanation(features, prediction, type):
    """Generate explanation for the prediction"""
    if prediction == 1:  # Malicious
        if type == 'url':
            reasons = []
            if features.get('suspicious_words', 0) > 1:
                reasons.append("suspicious keywords")
            if features.get('num_hyphens', 0) > 3:
                reasons.append("unusual domain structure")
            if features.get('has_https', 0) == 0:
                reasons.append("insecure connection")
            if features.get('has_ip', 0) == 1:
                reasons.append("IP address in URL")
            if features.get('num_dots', 0) > 4:
                reasons.append("excessive subdomains")
            return f"URL shows {', '.join(reasons) if reasons else 'characteristics'} commonly found in phishing attempts."
        else:  # email
            reasons = []
            if features.get('has_urgency', 0) == 1:
                reasons.append("urgency language")
            if features.get('has_threat', 0) == 1:
                reasons.append("threatening language")
            if features.get('has_reward', 0) == 1:
                reasons.append("prize/reward mentions")
            if features.get('has_security', 0) == 1:
                reasons.append("security-related keywords")
            if features.get('num_exclamation', 0) > 2:
                reasons.append("excessive punctuation")
            if features.get('uppercase_ratio', 0) > 0.3:
                reasons.append("excessive uppercase text")
            return f"Email contains {', '.join(reasons) if reasons else 'characteristics'} typical of phishing campaigns."
    else:  # Safe
        if type == 'url':
            return "URL appears legitimate based on security analysis."
        else:
            return "Email content appears safe and legitimate."


@app.post("/api/analyze/url")
async def analyze_url(
    request: dict,
    db: Session = Depends(get_db)
):
    """Analyze URL for phishing"""
    try:
        url = request.get("url", "")

        if not url:
            return {"error": "No URL provided"}

        features = extract_url_features(url)
        feature_vector = [features.get(f, 0) for f in url_features]

        prediction = url_model.predict([feature_vector])[0]
        probability = url_model.predict_proba([feature_vector])[0]

        result = {
            "classification": "malicious" if prediction == 1 else "safe",
            "confidence": float(probability[1]) if prediction == 1 else float(probability[0]),
            "highlighted_text": highlight_suspicious_url(url),
            "explanation": generate_explanation(features, prediction, 'url'),
            "type": "url"
        }
        
        # Save to history if user is authenticated
        # Note: We make current_user optional to allow unauthenticated scans
        # In production, you might want to require authentication
        try:
            # Try to get current user (will be None if not authenticated)
            from fastapi import Request
            # For now, we'll skip authentication requirement for backward compatibility
            # You can enable this later by making current_user required
            pass
        except:
            pass

        return result

    except Exception as e:
        return {"error": f"Server error: {str(e)}"}


@app.post("/api/analyze/email")
async def analyze_email(
    request: dict,
    db: Session = Depends(get_db)
):
    """Analyze email content for phishing"""
    try:
        email_text = request.get("emailText", "")

        if not email_text:
            return {"error": "No email text provided"}

        features = extract_email_features(email_text)
        feature_vector = [features.get(f, 0) for f in email_features]

        prediction = email_model.predict([feature_vector])[0]
        probability = email_model.predict_proba([feature_vector])[0]

        result = {
            "classification": "malicious" if prediction == 1 else "safe",
            "confidence": float(probability[1]) if prediction == 1 else float(probability[0]),
            "highlighted_text": highlight_suspicious_email(email_text),
            "explanation": generate_explanation(features, prediction, 'email'),
            "type": "email"
        }

        return result

    except Exception as e:
        return {"error": f"Server error: {str(e)}"}


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "PhishGuard Backend API",
        "version": "1.0.0"
    }


@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "PhishGuard API is running. Visit /docs for API documentation."}


# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@app.post("/api/auth/signup")
async def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == request.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        new_user = User(
            email=request.email,
            name=request.name,
            avatar=f"https://ui-avatars.com/api/?name={request.name}&background=00d9ff&color=fff"
        )
        new_user.set_password(request.password)
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Create access token - sub must be a string!
        access_token = create_access_token(data={"sub": str(new_user.id)})
        
        return {
            "success": True,
            "message": "User created successfully",
            "token": access_token,
            "user": new_user.to_dict()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )


@app.post("/api/auth/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user and return token"""
    try:
        # Find user by email
        user = db.query(User).filter(User.email == request.email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Verify password
        if not user.verify_password(request.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive"
            )
        
        # Create access token - sub must be a string!
        access_token = create_access_token(data={"sub": str(user.id)})
        
        return {
            "success": True,
            "message": "Login successful",
            "token": access_token,
            "user": user.to_dict()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during login: {str(e)}"
        )


@app.get("/api/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current authenticated user information"""
    return {
        "success": True,
        "user": current_user.to_dict()
    }


@app.put("/api/auth/profile")
async def update_profile(
    request: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile"""
    try:
        if request.name:
            current_user.name = request.name
            current_user.avatar = f"https://ui-avatars.com/api/?name={request.name}&background=00d9ff&color=fff"
        
        if request.email:
            # Check if email is already taken
            existing = db.query(User).filter(
                User.email == request.email,
                User.id != current_user.id
            ).first()
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already in use"
                )
            current_user.email = request.email
        
        current_user.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(current_user)
        
        return {
            "success": True,
            "message": "Profile updated successfully",
            "user": current_user.to_dict()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating profile: {str(e)}"
        )


# ============================================================================
# SCAN HISTORY ENDPOINTS
# ============================================================================

@app.get("/api/history")
async def get_scan_history(
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's scan history"""
    try:
        scans = db.query(ScanHistory).filter(
            ScanHistory.user_id == current_user.id
        ).order_by(
            ScanHistory.scan_date.desc()
        ).limit(limit).all()
        
        return {
            "success": True,
            "count": len(scans),
            "scans": [scan.to_dict() for scan in scans]
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving scan history: {str(e)}"
        )


@app.get("/api/history/stats")
async def get_scan_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's scan statistics"""
    try:
        total_scans = db.query(ScanHistory).filter(
            ScanHistory.user_id == current_user.id
        ).count()
        
        malicious_scans = db.query(ScanHistory).filter(
            ScanHistory.user_id == current_user.id,
            ScanHistory.classification == "malicious"
        ).count()
        
        safe_scans = total_scans - malicious_scans
        
        return {
            "success": True,
            "stats": {
                "total_scans": total_scans,
                "malicious_detected": malicious_scans,
                "safe_items": safe_scans,
                "accuracy_rate": 98.5  # Mock accuracy rate
            }
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving statistics: {str(e)}"
        )


@app.delete("/api/history/{scan_id}")
async def delete_scan(
    scan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a specific scan from history"""
    try:
        scan = db.query(ScanHistory).filter(
            ScanHistory.id == scan_id,
            ScanHistory.user_id == current_user.id
        ).first()
        
        if not scan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Scan not found"
            )
        
        db.delete(scan)
        db.commit()
        
        return {
            "success": True,
            "message": "Scan deleted successfully"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting scan: {str(e)}"
        )


@app.post("/api/history/save")
async def save_scan_to_history(
    request: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Save a scan result to user's history"""
    try:
        scan = ScanHistory(
            user_id=current_user.id,
            scan_type=request.get("type", "url"),
            content=request.get("content", ""),
            classification=request.get("classification", "unknown"),
            confidence=request.get("confidence", 0.0),
            explanation=request.get("explanation", ""),
            highlighted_text=request.get("highlighted_text", "")
        )
        
        db.add(scan)
        db.commit()
        db.refresh(scan)
        
        return {
            "success": True,
            "message": "Scan saved to history",
            "scan": scan.to_dict()
        }
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving scan: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn

    print("🚀 PhishGuard Backend API Starting...")
    print("📡 Endpoints:")
    print("   POST /api/analyze/url - Analyze URL for phishing")
    print("   POST /api/analyze/email - Analyze email content")
    print("   GET  /api/health - Health check")
    print("   GET  /docs - Interactive API documentation")
    print("\n🔗 React frontend should connect to: http://localhost:8000")

    # Start the server
    uvicorn.run(app, host="0.0.0.0", port=8000)