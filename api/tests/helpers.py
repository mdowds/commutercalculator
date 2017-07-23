from datetime import datetime

from api.data import Station, JourneyTime


def make_datetime(day):
    return datetime.strptime(day + ' 06 2016', '%d %m %Y')


def create_station_test_data():
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
        _station('BAZ', 'Baz', min_zone=2, max_zone=2)
    )


def create_journey_test_data():
    def _journey(origin, dest, time):
        return JourneyTime(origin=origin, destination=dest, time=time)

    return (
        _journey('FOO', 'BAR', 12),
        _journey('BAZ', 'FOO', 20),
        _journey('BAR', 'FOO', 10),
        _journey('BAR', 'FOO', 12)
    )
