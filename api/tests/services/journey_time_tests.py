import unittest
from api.services.journey_time import _process_times, JourneyTime


class JourneyTimeTest(unittest.TestCase):

    def test_process_times(self):
        self.assertEqual(2, _process_times([JourneyTime(time=2)]))
        self.assertEqual(None, _process_times([]))