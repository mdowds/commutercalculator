import unittest
from api.lib.functional.functional import *
from api.lib.functional.either import Either


class FunctionalTests(unittest.TestCase):

    # def test_Maybe(self):
    #     self.assertEqual("foo", Maybe("foo").value)
    #     self.assertEqual(1, Maybe(1).value)
    #     self.assertEqual(None, Maybe(None).value)
    #
    # def test_Maybe_bind(self):
    #     self.assertEqual(2, Maybe(1).bind(lambda x: x+1).value)
    #     self.assertEqual(None, Maybe(None).bind(lambda x: x+1).value)
    #
    # def test_Option(self):
    #     self.assertEqual(2, Option(2).value)
    #
    # def test_Option_or_call(self):
    #     self.assertEqual(3, Option(None).or_call(lambda x: x+2, 1).value)
    #     self.assertEqual(2, Option(2).or_call(lambda x: x+2, 1).value)
    #
    # def test_bind_Maybe(self):
    #     def square(x): return x*x
    #     self.assertEqual(4, Monad.bind(square)(Maybe(2)).value)
    #     self.assertEqual(None, Monad.bind(square)(Maybe(None)).value)

    def test_bind_Either(self):
        bound_inc = Monad.bind(lambda x: x+1)
        self.assertEqual(4, bound_inc(Either(3))._value)
        self.assertIsNone(bound_inc(Either(None, Exception()))._value)

    # def test_safe(self):
    #     safe_f = safe(lambda x: x)
    #     self.assertEqual("foo", safe_f("foo").value)
    #     self.assertEqual(None, safe_f(None).value)
