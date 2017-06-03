from typing import Union, Tuple

from peewee import fn, SQL

import api.interfaces.gmaps as gmaps
from api.data import JourneyTime
from api.data import Station
from api.interfaces.gmaps import JourneyTimeResult
from api.lib.functional import curried, F
from api.lib.utils import map_


def get_journey_times(destination: Station) -> Tuple[JourneyTimeResult, None]:
    times = JourneyTime\
        .select(JourneyTime.origin, fn.Avg(JourneyTime.time).alias('time'))\
        .join(Station)\
        .where(JourneyTime.destination == destination.sid)\
        .group_by(JourneyTime.origin)\
        .order_by(SQL('time'))

    return map_(lambda t: JourneyTimeResult(t.origin, t.time), times)


@curried
def update_journey_time(destination: Station, origin: Station) -> Union[JourneyTimeResult, None]:
    pipe = F() >> gmaps.get_peak_journey_time(destination) >> _save_journey_time(destination)
    return pipe(origin)


@curried
def _save_journey_time(destination: Station, result: JourneyTimeResult) -> Union[JourneyTimeResult, None]:
    if result is not None: JourneyTime.create(origin=result.origin.sid, destination=destination.sid, time=int(result.time))
    return result
