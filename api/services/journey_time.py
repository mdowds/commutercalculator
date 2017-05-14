from api.data import Station
from api.lib.functional import curried, F
from api.data import JourneyTime
from api.interfaces.gmaps import get_directions_multiple, JourneyTimeResult
from api.utils import filter_, map_
from typing import Union, Sequence, Tuple


def get_journey_times(destination: Station, origins: Sequence[Station]) -> Tuple[JourneyTimeResult]:
    existing_times = JourneyTime.select().where(JourneyTime.destination == destination.sid)

    return map_(_unique_times(existing_times), origins)


@curried
def _unique_times(times: Sequence[JourneyTime], origin: Station) -> Union[JourneyTimeResult, None]:
    filtered_times = filter_(lambda j: j.origin == origin.sid, times)
    return _process_db_times(filtered_times, origin)


def _process_db_times(times: Sequence[JourneyTime], origin: Station) -> Union[JourneyTimeResult, None]:
    if len(times) == 0: return None
    # TODO: Replace with more sophisticated averaging
    return JourneyTimeResult(origin, times[0].time)


def _get_times_and_save(destination: Station, origins: Sequence[Station]) -> Union[int, None]:
    pipe = F() >> get_directions_multiple(destination) >> map_(_save_to_db(destination))
    return pipe(origins)


@curried
def _save_to_db(destination: Station, result: JourneyTimeResult) -> Union[JourneyTimeResult, None]:
    if result is not None: JourneyTime.create(origin=result.origin.sid, destination=destination.sid, time=int(result.time))
    return result
