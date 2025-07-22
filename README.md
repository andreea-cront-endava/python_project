# Math Microservice

This microservice provides APIs to perform mathematical operations such as:
- Power function (`/pow`)
- N-th Fibonacci number (`/fibonacci`)
- Factorial of a number (`/factorial`)

## Features
- Logs all API requests and responses to an SQLite database.
- Caches expensive operations like Fibonacci and factorial.
- Containerized using Docker.

## Setup

### Prerequisites
- Python 3.9+
- Docker (optional, for containerization)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd math_microservice
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python app.py
   ```

### Using Docker
1. Build the Docker image:
   ```bash
   docker build -t math-microservice .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 math-microservice
   ```

## API Endpoints

### 1. Power Function
- **Endpoint**: `/pow`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "base": 2,
    "exponent": 3
  }
  ```
- **Response**:
  ```json
  {
    "result": 8.0
  }
  ```

### 2. Fibonacci
- **Endpoint**: `/fibonacci`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "n": 10
  }
  ```
- **Response**:
  ```json
  {
    "result": 55
  }
  ```

### 3. Factorial
- **Endpoint**: `/factorial`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "n": 5
  }
  ```
- **Response**:
  ```json
  {
    "result": 120
  }
  ```
