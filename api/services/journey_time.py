from api.data import Station
from api.lib.functional import curried, F
from api.data import JourneyTime
from api.interfaces.gmaps import JourneyTimeResult, get_journey_time
from api.utils import filter_, map_
from typing import Union, Sequence, Tuple


@curried
def get_journey_times(destination: Station, origins: Sequence[Station]) -> Tuple[JourneyTimeResult, None]:
    existing_times = JourneyTime.select().where(JourneyTime.destination == destination.sid)

    return map_(_unique_times(existing_times), origins)


def update_journey_times(destination: Station, origins: Sequence[Station]) -> Tuple[Union[JourneyTimeResult, None]]:
    pipe = F() >> get_journey_time(destination) >> _save_to_db(destination)
    return map_(pipe, origins)
    #return pipe(origins[0])


@curried
def _unique_times(times: Sequence[JourneyTime], origin: Station) -> Union[JourneyTimeResult, None]:
    filtered_times = filter_(lambda j: j.origin == origin.sid, times)
    return _process_db_times(filtered_times, origin)


def _process_db_times(times: Sequence[JourneyTime], origin: Station) -> Union[JourneyTimeResult, None]:
    if len(times) == 0: return None
    # TODO: Replace with more sophisticated averaging
    return JourneyTimeResult(origin, times[0].time)


@curried
def _save_to_db(destination: Station, result: JourneyTimeResult) -> Union[JourneyTimeResult, None]:
    if result is not None: JourneyTime.create(origin=result.origin.sid, destination=destination.sid, time=int(result.time))
    return result
