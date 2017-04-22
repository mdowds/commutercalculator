from functools import partial, reduce
from typing import Callable, Any

generic_func = Callable[[Any], Any]


class Maybe:
    def __init__(self, value):
        self.value = value

    def bind(self, fn):
        if self.value is None: return Maybe(None)
        return Maybe(fn(self.value))


def bind(fn: generic_func) -> generic_func:
    def __inner(fn, monad: Maybe):
        return monad.bind(fn)
    return partial(__inner, fn)

def pipeline(*functions: generic_func) -> generic_func:
    def pipeline2(f: generic_func, g: generic_func) -> generic_func:
        return lambda x: g(f(x))
    return reduce(pipeline2, functions, lambda x: x)
