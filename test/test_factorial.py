from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_factorial_valid():
    response = client.post("/factorial", json={"n": 5})
    assert response.status_code == 200
    assert response.json()["result"] == 120

def test_factorial_zero():
    response = client.post("/factorial", json={"n": 0})
    assert response.status_code == 200
    assert response.json()["result"] == 1

def test_factorial_negative():
    response = client.post("/factorial", json={"n": -1})
    assert response.status_code == 422  # Validare Pydantic
