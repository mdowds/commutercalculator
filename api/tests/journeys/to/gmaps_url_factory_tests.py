from unittest import TestCase
from api.journeys.to.gmaps_url_factory import *

class GmapsUrlFactoryTests(TestCase):

    def test_make_gmaps_direction_url(self):
        self.assertEqual(
            "https://www.google.com/maps/dir/?api=1&origin=Foo+Station,London&destination=Bar+Station,London&travelmode=transit",
            make_gmaps_direction_url("Foo", "Bar")
        )
        self.assertEqual(
            "https://www.google.com/maps/dir/?api=1&origin=Foo+Bar+Station,London&destination=Foo%2CBar+Station,London&travelmode=transit",
            make_gmaps_direction_url("Foo Bar", "Foo,Bar")
        )
