#definește un modul FastAPI care conține trei 
# endpointuri POST pentru calcule matematice: 
# Fibonacci, Putere și Factorial. 
# Totodată, salvează fiecare apel într-o bază de date (log al operațiilor).

from fastapi import APIRouter, HTTPException, Depends
from app.models import FibonacciRequest, PowRequest, FactorialRequest
from app.logic import fibonacci, pow_custom, factorial_custom
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.database.database_models import OperationLog

router = APIRouter()

# funcție pentru a obține sesiune de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/fibonacci")
def compute_fibonacci(payload: FibonacciRequest, db: Session = Depends(get_db)):
    try:
        result = fibonacci(payload.n)
        log = OperationLog(
            operation="fibonacci",
            input_data=str(payload.n),
            result=str(result)
        )
        db.add(log)
        db.commit()
        db.refresh(log)

        return {"n": payload.n, "fibonacci": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/pow")
def compute_pow(payload: PowRequest, db: Session = Depends(get_db)):
    result = pow_custom(payload.base, payload.exponent)
    log = OperationLog(
        operation="pow",
        input_data=f"{payload.base},{payload.exponent}",
        result=str(result)
    )
    db.add(log)
    db.commit()
    db.refresh(log)

    return {
        "base": payload.base,
        "exponent": payload.exponent,
        "result": result
    }

@router.post("/factorial")
def compute_factorial(payload: FactorialRequest, db: Session = Depends(get_db)):
    result = factorial_custom(payload.n)
    log = OperationLog(
        operation="factorial",
        input_data=str(payload.n),
        result=str(result)
    )
    db.add(log)
    db.commit()
    db.refresh(log)

    return {
        "n": payload.n,
        "result": result
    }
