from datetime import datetime
from typing import Tuple

from api.data import Station, JourneyTime, Travelcard


def make_datetime(day):
    return datetime.strptime(day + ' 06 2016', '%d %m %Y')


def create_station_test_data() -> Tuple[Station, ...]:
    def _station(sid, name, min_zone=1, max_zone=1, day_updated='01'):
        return Station(
            sid=sid,
            name=name,
            min_zone=min_zone,
            max_zone=max_zone,
            journey_times_updated=make_datetime(day_updated),
            lat=1.0, long=1.0, postcode="N1", major_station=True)

    return (
        _station('FOO', 'Foo'),
        _station('BAR', 'Bar', max_zone=2),
        _station('BAZ', 'Baz', min_zone=2, max_zone=2),
        _station('FOZ', 'Foz', min_zone=None, max_zone=None)
    )


def create_journey_test_data() -> Tuple[JourneyTime, ...]:
    def _journey(origin, dest, time):
        return JourneyTime(origin=origin, destination=dest, time=time)

    return (
        _journey('FOO', 'BAR', 12),
        _journey('BAZ', 'FOO', 20),
        _journey('BAR', 'FOO', 10),
        _journey('BAR', 'FOO', 12)
    )


def create_travelcard_test_data() -> Tuple[Travelcard, ...]:
    return (
        Travelcard(min_zone=1, max_zone=1, annual_price=1000),
        Travelcard(min_zone=1, max_zone=2, annual_price=1500),
        Travelcard(min_zone=2, max_zone=2, annual_price=750)
    )
