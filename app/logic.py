#calcul matematic

import math

#Functia Fibonacci
def fibonacci(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

# Functia putere
def pow_custom(base: float, exponent: float) -> float:
    return base ** exponent

#Functia factorial
def factorial_custom(n: int) -> int:
    return math.factorial(n)
