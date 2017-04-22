import unittest
from api.interfaces.gmaps import *


class GmapsInterfaceTests(unittest.TestCase):

    def test_directions_request_containsCorrectUrl(self):
        self.assertEqual("https://maps.googleapis.com/maps/api/directions/json", get_directions.args[0])
