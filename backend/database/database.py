"""
Database Configuration and Session Management
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from pathlib import Path
import os

from database.models import Base

# Database file location
DB_DIR = Path(__file__).parent
DB_FILE = DB_DIR / "phishguard.db"

# Create database URL
DATABASE_URL = f"sqlite:///{DB_FILE}"

# Create engine
# For SQLite, we use check_same_thread=False to allow FastAPI to use the database
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
    echo=False  # Set to True for SQL query debugging
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """Initialize the database - create all tables"""
    print("🗄️  Initializing database...")
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print(f"✅ Database initialized successfully at: {DB_FILE}")
        return True
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        return False


def get_db() -> Session:
    """
    Dependency function to get database session
    Use with FastAPI Depends
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def reset_db():
    """Drop all tables and recreate (USE WITH CAUTION)"""
    print("⚠️  Resetting database - all data will be lost!")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("✅ Database reset complete")


# Initialize database on import
if not DB_FILE.exists():
    print(f"📁 Database file not found. Creating new database...")
    init_db()
else:
    print(f"📁 Database found at: {DB_FILE}")
    # Ensure all tables exist (in case schema changed)
    Base.metadata.create_all(bind=engine)
