import unittest
from api.lib.functional import *


class FunctionalTests(unittest.TestCase):

    def test_Maybe(self):
        self.assertEqual("foo", Maybe("foo").value)
        self.assertEqual(1, Maybe(1).value)
        self.assertEqual(None, Maybe(None).value)

    def test_Maybe_bind(self):
        self.assertEqual(2, Maybe(1).bind(lambda x: x+1).value)
        self.assertEqual(None, Maybe(None).bind(lambda x: x+1).value)

    def test_Option(self):
        self.assertEqual(2, Option(2).value)

    def test_Option_or_call(self):
        self.assertEqual(3, Option(None).or_call(lambda x: x+2, 1).value)
        self.assertEqual(2, Option(2).or_call(lambda x: x+2, 1).value)

    def test_bind(self):
        def square(x): return x*x
        self.assertEqual(4, bind(square)(Maybe(2)).value)
        self.assertEqual(None, bind(square)(Maybe(None)).value)

    def test_pipeline(self):
        def inc(x): return x+1
        def square(x): return x*x
        expected = square(inc(1))
        pipe = pipeline(inc, square)
        self.assertEqual(expected, pipe(1))

    def test_safe(self):
        safe_f = safe(lambda x: x)
        self.assertEqual("foo", safe_f("foo").value)
        self.assertEqual(None, safe_f(None).value)
