
#are rolul de a crea automat tabelele definite 
#în modelele tale dacă ele nu există deja în baza de date.

from fastapi import FastAPI
from app.api import router
from app.database.database import engine
from app.database.database_models import Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI( )
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173", "http://127.0.0.1:5173",],
  allow_methods=["*"],
  allow_headers=["*"],
  allow_credentials=True,
)
app.include_router(router)


# creează tabelele în SQLite dacă nu există
Base.metadata.create_all(bind=engine)