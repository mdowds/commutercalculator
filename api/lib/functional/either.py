from typing import Any
from .functional import Func, Monad


class Either(Monad):
    def __init__(self, value: Any, error: Exception=None):
        super().__init__(value)
        self._error = error or None

    def bind(self, f: Func):
        if self._error is not None: return self
        return Either(f(self._value))

    @staticmethod
    def try_(f: Func, x: Any=None):
        try:
            value = f(x) if x else f()
            return Either(value)
        except Exception as e:
            return Either(None, e)