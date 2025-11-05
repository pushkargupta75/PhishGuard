"""
Database Models for PhishGuard
SQLAlchemy ORM models for User and ScanHistory
"""

from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import bcrypt

Base = declarative_base()


class User(Base):
    """User model for authentication and profile management"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    avatar = Column(String(500), nullable=True)
    subscription = Column(String(50), default="Free")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to scan history
    scans = relationship("ScanHistory", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password: str):
        """Hash and set the user's password"""
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def verify_password(self, password: str) -> bool:
        """Verify the provided password against the stored hash"""
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password_hash.encode('utf-8')
        )

    def to_dict(self):
        """Convert user object to dictionary (without password)"""
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "avatar": self.avatar,
            "subscription": self.subscription,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class ScanHistory(Base):
    """Scan history model to track all phishing scans"""
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scan_type = Column(String(50), nullable=False)  # 'url' or 'email'
    content = Column(Text, nullable=False)  # The URL or email content scanned
    classification = Column(String(50), nullable=False)  # 'safe' or 'malicious'
    confidence = Column(Float, nullable=False)  # Confidence score (0-1)
    explanation = Column(Text, nullable=True)  # Detection explanation
    highlighted_text = Column(Text, nullable=True)  # Highlighted suspicious parts
    scan_date = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationship to user
    user = relationship("User", back_populates="scans")

    def to_dict(self):
        """Convert scan history object to dictionary"""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "scan_type": self.scan_type,
            "content": self.content[:100] + "..." if len(self.content) > 100 else self.content,  # Truncate for preview
            "classification": self.classification,
            "confidence": self.confidence,
            "explanation": self.explanation,
            "highlighted_text": self.highlighted_text,
            "scan_date": self.scan_date.isoformat() if self.scan_date else None
        }
