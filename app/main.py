#are rolul de a crea automat tabelele definite 
#în modelele tale dacă ele nu există deja în baza de date.

from fastapi import FastAPI
from app.api import router
from app.database.database import engine
from app.database.database_models import Base

app = FastAPI( )
app.include_router(router)

# creează tabelele în SQLite dacă nu există
Base.metadata.create_all(bind=engine)