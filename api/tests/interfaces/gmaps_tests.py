import unittest
from api.interfaces.gmaps import *


class GmapsInterfaceTests(unittest.TestCase):

    def test_directions_request_containsCorrectUrl(self):
        self.assertEqual("https://maps.googleapis.com/maps/api/directions/json", directions_request.args[0])

    def test_make_directions_params(self):
        params = make_directions_params("foo", "bar", "abc")
        self.assertEqual("foo", params["origin"])
        self.assertEqual("bar", params["destination"])
        self.assertEqual("abc", params["key"])



