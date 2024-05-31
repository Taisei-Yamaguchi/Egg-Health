from fractions import Fraction

def parse_fraction(value):
    try:
        return float(Fraction(value))
    except ValueError:
        return float(value)