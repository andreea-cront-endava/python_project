# app/stream_listener.py
#Scriptul citește logurile în timp real din stream-ul Redis "math_logs" și le afișează în terminal imediat ce apar.
import redis
import time

r = redis.Redis(host="localhost", port=6379)
last_id = "0"

print("Listening to Redis stream 'math_logs'...\n")

while True:
    messages = r.xread({"math_logs": last_id}, block=0, count=1)
    for stream, entries in messages:
        for msg_id, data in entries:
            print(f"[{msg_id.decode()}] {data}")
            last_id = msg_id.decode()
