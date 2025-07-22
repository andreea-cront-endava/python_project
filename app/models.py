# app/models.py- clase Pydantic care definesc 
# modelele de date pentru request-urile API-ului tău.
# modelele sunt folosite pentru a valida automat datele 
# primite în endpointurile tale FastAPI.

from pydantic import BaseModel, Field

class FibonacciRequest(BaseModel):
    n: int = Field(ge=0, description="Indexul n trebuie să fie >= 0")

class PowRequest(BaseModel):
    base: float
    exponent: float

class FactorialRequest(BaseModel):
    n: int = Field(ge=0, description="Număr întreg ≥ 0")
