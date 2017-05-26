import unittest
from api.utils import *


class UtilsTests(unittest.TestCase):

    def test_dict_path(self):
        dict1 = {"foo": "bar"}
        dict2 = {2: 4}

        self.assertEqual("bar", dict_path(["foo"], dict1))
        self.assertEqual(4, dict_path([2], dict2))

    def test_dict_path_withNestedDict(self):
        dict1 = {"foo": {"bar": "baz"}}
        dict2 = {"foo": {"bar": {"baz": "foz"}}}
        dict3 = {1: {2: 3}}

        self.assertEqual("baz", dict_path(("foo", "bar"), dict1))
        self.assertEqual("foz", dict_path(("foo", "bar", "baz"), dict2))
        self.assertEqual(3, dict_path((1, 2), dict3))

    def test_dict_path_withArrayInDict(self):
        dict1 = {"foo": [{"bar": "baz"}]}
        self.assertEqual("baz", dict_path(("foo", 0, "bar"), dict1))

    def test_dict_path_withMissingKey(self):
        self.assertEqual(None, dict_path("foo", {}))

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

    def test_map(self):
        self.assertEqual((2,3,4), map_(lambda x: x + 1, (1, 2, 3)))
        self.assertEqual((2,3,4), map_(lambda x: x + 1, [1, 2, 3]))

    def test_filter(self):
        self.assertEqual((1,2), filter_(lambda x: x < 10, (1, 2, 11, 12)))
        self.assertEqual((1,2), filter_(lambda x: x < 10, [1, 2, 11, 12]))

    def test_find(self):
        self.assertEqual("foo", find(lambda x: x == "foo", ("foo", "bar")))
        self.assertEqual("foo", find(lambda x: x == "foo", ["foo", "bar"]))
