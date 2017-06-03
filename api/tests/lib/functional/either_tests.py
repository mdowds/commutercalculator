import unittest
from api.lib.functional.either import Either


class EitherTests(unittest.TestCase):

    def test_init(self):
        either = Either(1, None)
        self.assertEqual(1, either._value)
        self.assertIsNone(either._error)

        error_either = Either(None, Exception("Foo"))
        self.assertIsNone(error_either._value)
        self.assertEqual("Foo", error_either._error.args[0])

    def test_try(self):
        either = Either.try_(lambda x: x, 2)
        self.assertEqual(2, either._value)
        self.assertIsNone(either._error)

    def test_try_with_error(self):
        def _raiser(): raise Exception("Foo")
        either = Either.try_(_raiser)
        self.assertIsNone(either._value)
        self.assertEqual("Foo", either._error.args[0])

    def test_bind(self):
        self.assertEqual(2, Either(1).bind(lambda x: x+1)._value)
        self.assertEqual("Foo", Either(None, Exception("Foo")).bind(lambda x: x+1)._error.args[0])
