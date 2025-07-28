# app/stream_logger.py
#scrie loguri în stream-ul Redis "math_logs".
import redis
import json

r = redis.Redis(host="localhost", port=6379)

def log_event(operation: str, input_data: str, result: str):
    entry = {
        "operation": operation,
        "input": input_data,
        "result": result
    }
    r.xadd("math_logs", entry)
