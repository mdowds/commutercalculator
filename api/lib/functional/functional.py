from functools import partial, reduce, wraps
from typing import Callable, Any, Generic, TypeVar
from inspect import getfullargspec
from abc import ABCMeta, abstractmethod

T = TypeVar('T')
Func = Callable[[T], Any]


class Monad(Generic[T]):
    __metaclass__ = ABCMeta

    def __init__(self, value: T):
        self._value = value or None

    def get_value(self):
        return self._value

    @abstractmethod
    def _bind(self, f: Func): pass

    @staticmethod
    def bind(fn: Func) -> Func:
        def __inner(fn: Func, monad: Monad):
            return monad._bind(fn)

        return partial(__inner, fn)



# class Maybe:
#     def __init__(self, value):
#         self.value = value
#
#     def bind(self, fn):
#         if self.value is None: return Maybe(None)
#         return Maybe(fn(self.value))
#
#
# class Option:
#     def __init__(self, value):
#         self.value = value
#
#     def or_call(self, fn, *args):
#         return Option(fn(*args)) if self.value is None else self
#
#
# def safe(fn: Func) -> Func:
#     return lambda x: Maybe(fn(x))


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
