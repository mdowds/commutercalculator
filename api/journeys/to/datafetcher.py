from typing import Tuple, Optional

from fnplus import curried, tfilter, tmap
from peewee import fn, SQL

from api.data import Station, JourneyTime, Travelcard
from api.types import JourneyPrice


def get_destination(sid: str) -> Station:
    try:
        return Station.get(Station.sid == sid)
    except Station.DoesNotExist as e:
        raise e

@curried
def get_journey_times(min_time: int, max_time: int, destination: Station) -> Tuple[JourneyTime, ...]:
    return JourneyTime\
        .select(JourneyTime.origin, fn.Avg(JourneyTime.time).alias('time'))\
        .join(Station)\
        .where(JourneyTime.destination == destination.sid, JourneyTime.time > min_time, JourneyTime.time < max_time)\
        .group_by(JourneyTime.origin)\
        .order_by(SQL('time'))


@curried
def get_travelcard_prices(origins: Tuple[Station, ...], destination: Station) -> Tuple[JourneyPrice, ...]:
    travelcards = Travelcard.select()

    @curried
    def _travelcard_for_journey(destination: Station, origin: Station) -> Optional[Travelcard]:
        if origin.min_zone is None: return None

        possible_prices = tfilter(lambda t: (
            (t.min_zone==destination.max_zone and t.max_zone==origin.min_zone) or
            (t.min_zone==destination.min_zone and t.max_zone==origin.max_zone)
        ), travelcards)

        sorted_prices = sorted(possible_prices, key=lambda t: t.annual_price)
        if len(sorted_prices) == 0: print(origin.name)

        return sorted_prices[0] if len(sorted_prices) > 0 else None

    return tmap(lambda origin: JourneyPrice(
        origin,
        destination,
        _travelcard_for_journey(destination, origin)
    ), origins)
