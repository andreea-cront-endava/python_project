from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_pow_valid():
    response = client.post("/pow", json={"base": 2, "exponent": 3})
    assert response.status_code == 200
    assert response.json()["result"] == 8.0

def test_pow_decimal():
    response = client.post("/pow", json={"base": 2.5, "exponent": 2})
    assert response.status_code == 200
    assert round(response.json()["result"], 2) == 6.25

def test_pow_missing_field():
    response = client.post("/pow", json={"base": 5})
    assert response.status_code == 422  # lipsă exponent
