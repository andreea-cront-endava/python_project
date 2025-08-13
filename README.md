## Authors and Contributions
-  Andreea Cronț
-  Sanda Dobrenco

# Math Microservice

This microservice provides APIs to perform mathematical operations such as:
- Power function 
- N-th Fibonacci number 
- Factorial of a number 

## Features
- JWT-based user authentication (`/register`, `/login`)
- Logs all API requests to SQLite and Redis Streams
- Caches CPU-intensive operations (Fibonacci, Factorial)
- Prometheus metrics exposed via `/metrics`
- Docker containerization for easy deployment
- React-based frontend in `/frontend`

## Setup

### Prerequisites
- Python 3.9+
- Docker (for containerization)
- Node.js & npm (for frontend)

### Installation
1. Clone the repository:
   git clone <repository-url>
   cd math_microservice


2. Create a virtual environment and activate it:
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   

3. Install dependencies:
   pip install -r requirements.txt
   

4. Run the application:
   uvicorn app.main:app --reload
   

### Using Docker
1. Build the Docker image:
   docker build -t math-microservice .
   

2. Run the Docker container:
   docker run -p 8000:8000 math-microservice


## API Endpoints

### 1. Power Function
- Method: POST
- Request Body:
  {
    "base": 2,
    "exponent": 3
  }

- Response:
  {
    "result": 8.0
  }
  

### 2. Fibonacci
- Method: POST
- Request Body:
  {
    "n": 10
  }

- Response:
  {
    "result": 55
  }

### 3. Factorial
- Method: POST
- Request Body:
  {
    "n": 5
  }
  
- Response:
  {
    "result": 120
  }



### Authentication (JWT)

This microservice uses JWT-based authentication:

- Users must register via `/register`
- Then authenticate via `/login` and receive a JWT token
- All protected endpoints (`/pow`, `/fibonacci`, `/factorial`, `/my-logs`) require Authorization

### Monitoring

The service exposes a `/metrics` endpoint using `prometheus_fastapi_instrumentator`.

It tracks:
- Total number of requests
- Request durations
- Response status codes

These metrics are compatible with Prometheus & Grafana.


### Logging via Redis Stream

All operations are logged into Redis using Redis Streams:

- Log producer: `stream_logger.py` with `xadd(...)`
- Log consumer: `stream_listener.py` using `xread(...)`. To view logs in real time, after starting Redis (e.g. with Docker), run:   python -m app.stream_listener
- Example stream: `math_logs`

Redis container is included and used in runtime.


### Protected Endpoints

The following routes require a valid JWT token in the `Authorization` header:

- `POST /mathfunctions`
- `GET /my-loggs`

### Operation History

Each user's operations are logged into both:
- A relational database (SQLite)
- A Redis stream (`math_logs`)

Users can retrieve their personal operation history via: /my-loggs

This returns a list of:
- operation name
- input values
- result
- timestamp

### Caching

The application uses in-memory caching via Python’s `functools.lru_cache` decorator for:

- `fibonacci(n)`
- `factorial(n)`

This avoids redundant calculations for repeated inputs and improves performance, especially for recursive or large values of `n`.

Cache is enabled only during the runtime of the application (non-persistent) and is thread-safe by default.

### Frontend Setup
1. Navigate to the frontend directory:  cd frontend
2. Install dependencies: npm install
3. Run the development server: npm run dev

The React frontend exposes the following routes:

| Route             | Description                              
|------------------|------------------------------------------
| `/login`          | Login form to authenticate users         
| `/register`       | Registration form for new users          
| `/mathfunctions`  | Protected page to perform operations     
| `/my-loggs`        | Displays the current user's operation history 

Frontend is located in the `/frontend` folder and communicates with the backend via JWT authentication.

## Database

This microservice uses a local **SQLite database** to persist user operations and authentication data.

The database file (math_operations.db) is automatically created when the backend starts, and is located in the project root as:

--Tables Overview
1. users - Stores user authentication data
2. operation_logs - Stores every operation requested by authenticated users
