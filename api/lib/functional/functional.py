from functools import partial, reduce, wraps
from typing import Callable, Any
from inspect import getfullargspec

generic_func = Callable[[Any], Any]


class Maybe:
    def __init__(self, value):
        self.value = value

    def bind(self, fn):
        if self.value is None: return Maybe(None)
        return Maybe(fn(self.value))


class Option:
    def __init__(self, value):
        self.value = value

    def or_call(self, fn, *args):
        return Option(fn(*args)) if self.value is None else self


def bind(fn: generic_func) -> generic_func:
    def __inner(fn, monad: Maybe):
        return monad.bind(fn)
    return partial(__inner, fn)


def pipeline(*functions: generic_func) -> generic_func:
    def pipeline2(f: generic_func, g: generic_func) -> generic_func:
        return lambda x: g(f(x))
    return reduce(pipeline2, functions, lambda x: x)


def safe(fn: generic_func) -> generic_func:
    return lambda x: Maybe(fn(x))


# Modified version of fn.py decorator to support type annotations
def curried(func):
    @wraps(func)
    def _curried(*args, **kwargs):
        f = func
        count = 0
        while isinstance(f, partial):
            if f.args:
                count += len(f.args)
            f = f.func

        spec = getfullargspec(f)

        if count == len(spec.args) - len(args):
            return func(*args, **kwargs)

        return curried(partial(func, *args, **kwargs))
    return _curried
