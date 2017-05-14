import unittest
from api.services.journey_time import _process_db_times, JourneyTime, _unique_times, Station


class JourneyTimeTest(unittest.TestCase):

    station = Station(sid="FOO", name="Foo Station")

    def test_unique_times(self):
        actual = _unique_times([JourneyTime(time=2, origin="FOO"), JourneyTime(time=3, origin="FOO")], self.station)
        self.assertEqual(2, actual.time)
        self.assertEqual("FOO", actual.origin.sid)

    def test_process_db_times(self):
        actual = _process_db_times([JourneyTime(time=2, origin="FOO")], self.station)
        self.assertEqual(2, actual.time)
        self.assertEqual("FOO", actual.origin.sid)
        self.assertEqual(None, _process_db_times([], self.station))