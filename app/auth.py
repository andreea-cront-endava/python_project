#auth.py
from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.database.database_models import User,OperationLog
from app.models import UserCreate, UserLogin
from app.security import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy import Column, Integer, String, DateTime, func
from app.database.database import Base
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
import bcrypt

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter()

API_KEY = "secret123"  # cheia pe care trebuie să o trimită userul
API_KEY_NAME = "X-API-Key"

SECRET_KEY = "secret123" 
ALGORITHM = "HS256"

api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="", auto_error=False)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])  # ✅ fix aici
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def verify_api_key(api_key: str = Security(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")



@router.post("/register")
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    print("Received register request:", user_data)
    # Verificăm dacă emailul e deja înregistrat
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Criptăm parola
    hashed_pw = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())

    # Creăm user nou
    new_user = User(email=user_data.email, hashed_password=hashed_pw.decode('utf-8'))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully", "user_id": new_user.id}


@router.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    print("Received login data:", user_data)
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid password or email")

    # Verificăm parola
    if not bcrypt.checkpw(user_data.password.encode('utf-8'), user.hashed_password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid password or email")

    # Creăm token JWT
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/my-logs")
def get_user_logs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logs = db.query(OperationLog)\
             .filter(OperationLog.email == current_user.email)\
             .order_by(OperationLog.timestamp.desc())\
             .all()
    return logs