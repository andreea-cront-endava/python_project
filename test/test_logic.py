import pytest
from app.logic import fibonacci, factorial_custom, pow_custom

# FIBONACCI – unit tests

def test_fibonacci_0():
    assert fibonacci(0) == 0

def test_fibonacci_1():
    assert fibonacci(1) == 1

def test_fibonacci_6():
    assert fibonacci(6) == 8

def test_fibonacci_large():
    assert fibonacci(10) == 55

def test_fibonacci_negative():
    with pytest.raises(ValueError):
        fibonacci(-1)


# FACTORIAL – unit tests


def test_factorial_0():
    assert factorial_custom(0) == 1

def test_factorial_1():
    assert factorial_custom(1) == 1

def test_factorial_5():
    assert factorial_custom(5) == 120

def test_factorial_negative():
    with pytest.raises(ValueError):
        factorial_custom(-5)

# POW – unit tests

def test_pow_basic():
    assert pow_custom(2, 3) == 8

def test_pow_zero_exponent():
    assert pow_custom(10, 0) == 1

def test_pow_negative_exponent():
    assert pow_custom(2, -2) == 0.25

def test_pow_float_base():
    assert pow_custom(1.5, 2) == 2.25
