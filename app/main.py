#main.py
# Inițializează aplicația FastAPI și configurează CORS
# Încarcă rutele pentru API și autentificare
# Activează monitorizarea cu Prometheus (via prometheus_fastapi_instrumentator)
# Creează automat tabelele din baza de date folosind SQLAlchemy
from fastapi import FastAPI
from app.api import router
from app.auth import router as auth_router
from app.database.database import engine
from app.database.database_models import Base
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rute
app.include_router(auth_router)
app.include_router(router)

#  Prometheus 
instrumentator = Instrumentator()
instrumentator.instrument(app).expose(app)
#  Tabele
Base.metadata.create_all(bind=engine)

