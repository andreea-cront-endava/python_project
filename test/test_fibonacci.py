from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_fibonacci_valid():
    response = client.post("/fibonacci", json={"n": 6})
    assert response.status_code == 200
    assert response.json()["fibonacci"] == 8
def test_fibonacci_zero():
    response = client.post("/fibonacci", json={"n": 0})
    assert response.status_code == 200
    assert response.json()["fibonacci"] == 0                