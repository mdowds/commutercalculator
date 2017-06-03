import unittest
from api.lib.utils.frozendict import frozendict


class FrozendictTests(unittest.TestCase):
    def test_add(self):
        d = frozendict({})
        da = d.add('foo', 'bar')
        self.assertEqual('bar', da['foo'])
        self.assertEqual(0, len(d))
