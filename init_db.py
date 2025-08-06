from app.database.database import engine
from app.database.database_models import Base

# Creează tabelele definite (OperationLog și User)
Base.metadata.create_all(bind=engine)

print("Tables created or already exist.")
