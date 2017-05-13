import unittest
from api.services.journey_time import *


class JourneyTimeTest(unittest.TestCase):

    def test_process_times(self):
        self.assertEqual(2, process_times([JourneyTime(time=2)]))
        self.assertEqual(None, process_times([]))