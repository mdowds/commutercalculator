import unittest
from api.utils import *


class UtilsTests(unittest.TestCase):

    def test_dict_value(self):
        dict1 = {"foo": "bar"}
        dict2 = {2: 4}

        self.assertEqual("bar", dict_value(["foo"], dict1))
        self.assertEqual(4, dict_value([2], dict2))

    def test_dict_value_withNestedDict(self):
        dict1 = {"foo": {"bar": "baz"}}
        dict2 = {"foo": {"bar": {"baz": "foz"}}}
        dict3 = {1: {2: 3}}

        self.assertEqual("baz", dict_value(("foo", "bar"), dict1))
        self.assertEqual("foz", dict_value(("foo", "bar", "baz"), dict2))
        self.assertEqual(3, dict_value((1, 2), dict3))

    def test_dict_value_withArrayInDict(self):
        dict1 = {"foo": [{"bar": "baz"}]}
        self.assertEqual("baz", dict_value(("foo", 0, "bar"), dict1))

    def test_dict_value_withMissingKey(self):
        self.assertEqual(None, dict_value("foo", {}))

    def test_secs_to_mins(self):
        self.assertEqual(1, secs_to_mins(60))
        self.assertEqual(5, secs_to_mins(300))
        self.assertEqual(50, secs_to_mins(3005))

    def test_load_config_value(self):
        abspath = os.path.abspath(__file__)
        dname = os.path.dirname(abspath)
        os.chdir(dname)
        self.assertEqual("bar", load_config_value("foo"))

    def test_create_error(self):
        error = create_error("Error")
        self.assertIsNotNone(error["error"])
        self.assertEqual("Error", error["error"])

    def test_tuple_map(self):
        self.assertEqual((2,3,4), tuple_map(lambda x: x + 1, (1,2,3)))
        self.assertEqual((2,3,4), tuple_map(lambda x: x + 1, [1,2,3]))

    def test_tuple_filter(self):
        self.assertEqual((1,2), tuple_filter(lambda x: x < 10, (1,2,11,12)))
        self.assertEqual((1,2), tuple_filter(lambda x: x < 10, [1,2,11,12]))