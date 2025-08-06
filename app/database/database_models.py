#database_models.py
from sqlalchemy import Column, Integer, String, DateTime, func
from .database import Base

class OperationLog(Base):
    __tablename__ = "operation_logs"

    id = Column(Integer, primary_key=True, index=True)
    operation = Column(String, nullable=False)
    input_data = Column(String, nullable=False)
    result = Column(String, nullable=False)
    email = Column(String, nullable=False) 
    timestamp = Column(DateTime, default=func.now())


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())