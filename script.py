from app.database.database import SessionLocal
from app.database.database_models import User

db = SessionLocal()
users = db.query(User).all()
print(users)
db.close()
