from api.data import Station
from api.lib.functional import Maybe, safe, bind, Option, curried, F
from api.data import JourneyTime
from api.interfaces import gmaps
from api.utils import secs_to_mins, filter_, map_
from typing import Union, Sequence
from collections import namedtuple

JourneyTimeResult = namedtuple('JourneyTimeResult', ['origin', 'time'])


def get_journey_times(destination: Station, origins: Sequence[Station]) -> Sequence[JourneyTimeResult]:
    existing_times = JourneyTime.select().where(JourneyTime.destination == destination.sid)

    return map_(_unique_times(existing_times), origins)


@curried
def _unique_times(times: Sequence[JourneyTime], origin: Station) -> Union[JourneyTimeResult, None]:
    filtered_times = filter_(lambda j: j.origin == origin.sid, times)
    return _process_times(filtered_times, origin)


@curried
def get_journey_time(destination: Station, origin: Station) -> Union[int, None]:
    return Option(_time_from_db(origin, destination)).or_call(_get_time_and_save, origin, destination).value


def _time_from_db(origin: Station, destination: Station) -> Union[int, None]:
    times = JourneyTime.select().where((JourneyTime.origin == origin.sid) & (JourneyTime.destination == destination.sid))
    return _process_times(times)


def _process_times(times: Sequence[JourneyTime], origin: Station) -> Union[JourneyTimeResult, None]:
    if len(times) == 0: return None
    # TODO: Replace with more sophisticated averaging
    return JourneyTimeResult(origin, times[0].time)


def _get_time_and_save(origin: Station, destination: Station) -> Union[int, None]:
    pipe = F() >> _time_from_gmaps(origin) >> bind(_save_to_db(origin, destination))
    return pipe(destination).value


@curried
def _time_from_gmaps(origin: Station, destination: Station) -> Maybe:
    pipe = F() >> gmaps.build_params(origin) >> gmaps.get_directions >> safe(gmaps.extract_duration) >> bind(secs_to_mins)

    return pipe(destination)


@curried
def _save_to_db(origin: Station, destination: Station, time: int) -> Union[int, None]:
    JourneyTime.create(origin=origin.sid, destination=destination.sid, time=int(time))
    return time
