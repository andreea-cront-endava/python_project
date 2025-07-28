from fastapi import Depends, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader

API_KEY = "secret123"  # cheia pe care trebuie să o trimită userul
API_KEY_NAME = "X-API-Key"

api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def verify_api_key(api_key: str = Security(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")
