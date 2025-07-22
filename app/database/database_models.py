from sqlalchemy import Column, Integer, String, DateTime, func
from .database import Base

class OperationLog(Base):
    __tablename__ = "operation_logs"

    id = Column(Integer, primary_key=True, index=True)
    operation = Column(String, nullable=False)
    input_data = Column(String, nullable=False)
    result = Column(String, nullable=False)
    timestamp = Column(DateTime, default=func.now())
