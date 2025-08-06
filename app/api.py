#definește un modul FastAPI care conține trei 
# endpointuri POST pentru calcule matematice: 
# Fibonacci, Putere și Factorial. 
# Totodată, salvează fiecare apel într-o bază de date (log al operațiilor).

from fastapi import APIRouter, HTTPException, Depends
from app.models import FibonacciRequest, PowRequest, FactorialRequest
from app.logic import fibonacci, pow_custom, factorial_custom
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.database.database_models import OperationLog, User
from app.auth import verify_api_key, get_current_user
from app.stream_logger import log_event

router = APIRouter()

# funcție pentru a obține sesiune de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/fibonacci")
def compute_fibonacci(payload: FibonacciRequest, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    result = fibonacci(payload.n)
    try:
        log = OperationLog(
            operation="fibonacci",
            input_data=str(payload.n),
            result=str(result),
            email=current_user.email
        )
        db.add(log)
        db.commit()
        db.refresh(log)

        log_event("fibonacci", str(payload.n), str(result))

        return {"n": payload.n, "fibonacci": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/pow")
def compute_pow(payload: PowRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = pow_custom(payload.base, payload.exponent)
    log = OperationLog(
        operation="pow",
        input_data=f"{payload.base},{payload.exponent}",
        result=str(result),
        email=current_user.email
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    log_event("pow", f"{payload.base},{payload.exponent}", str(result))
    return {
        "base": payload.base,
        "exponent": payload.exponent,
        "result": result
    }

@router.post("/factorial")
def compute_factorial(payload: FactorialRequest, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    result = factorial_custom(payload.n)
    log = OperationLog(
        operation="factorial",
        input_data=str(payload.n),
        result=str(result),
        email=current_user.email
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    log_event("factorial", str(payload.n), str(result))

    return {
        "n": payload.n,
        "result": result
    }

@router.get("/my-logs")
def get_user_logs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logs = db.query(OperationLog).filter(OperationLog.email == current_user.email).order_by(OperationLog.timestamp.desc()).all()
    return logs
