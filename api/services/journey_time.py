from api.data import Station
from api.lib.functional import Maybe, safe, bind, Option, curried, F
from api.data import JourneyTime
from api.interfaces import gmaps
from api.utils import secs_to_mins
from typing import Union, Sequence


@curried
def get_journey_time(destination: Station, origin: Station) -> Union[int, None]:
    return Option(time_from_db, origin, destination).or_call(get_time_and_save, origin, destination).value


def time_from_db(origin: Station, destination: Station) -> Union[int, None]:
    times = JourneyTime.select().where((JourneyTime.origin == origin.sid) & (JourneyTime.destination == destination.sid))
    return process_times(times)


def process_times(times: Sequence[JourneyTime]) -> Union[int, None]:
    if len(times) == 0: return None
    # TODO: Replace with more sophisticated averaging
    return times[0].time


def get_time_and_save(origin: Station, destination: Station) -> Union[int, None]:
    pipe = F() >> time_from_gmaps(origin) >> bind(save_to_db(origin, destination))
    return pipe(destination).value


@curried
def time_from_gmaps(origin: Station, destination: Station) -> Maybe:
    pipe = F() >> gmaps.build_params(origin) >> gmaps.get_directions >> safe(gmaps.extract_duration) >> bind(secs_to_mins)

    return pipe(destination)


@curried
def save_to_db(origin: Station, destination: Station, time: int) -> Union[int, None]:
    JourneyTime.create(origin=origin.sid, destination=destination.sid, time=int(time))
    return time
