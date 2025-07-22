from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite local
DATABASE_URL = "sqlite:///./math_requests.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}  # necesar pt SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
