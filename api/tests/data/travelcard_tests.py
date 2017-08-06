import unittest
from api.data import Travelcard


class TravelcardTests(unittest.TestCase):

    def test_serialize(self):
        travelcard = Travelcard(min_zone=1, max_zone=2, annual_price=1000)
        result = travelcard.serialize()

        self.assertEqual(travelcard.min_zone, result["minZone"])
        self.assertEqual(travelcard.max_zone, result["maxZone"])
        self.assertEqual(travelcard.annual_price, result["price"])
