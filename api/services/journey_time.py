from typing import Tuple, NamedTuple

from peewee import fn, SQL

from api.data import JourneyTime
from api.data import Station
from api.lib.utils import map_


JourneyTimeResult = NamedTuple('JourneyTimeResult', (('origin', Station), ('time', int)))


def get_journey_times(destination: Station) -> Tuple[JourneyTimeResult, ...]:
    times = JourneyTime\
        .select(JourneyTime.origin, fn.Avg(JourneyTime.time).alias('time'))\
        .join(Station)\
        .where(JourneyTime.destination == destination.sid)\
        .group_by(JourneyTime.origin)\
        .order_by(SQL('time'))

    return map_(lambda t: JourneyTimeResult(t.origin, t.time), times)
