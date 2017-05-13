from api.data import Station
from api.lib.functional import Maybe, safe, bind, Option
from api.data import JourneyTime
from api.interfaces import gmaps
from api.utils import secs_to_mins
from fn import F, _
from typing import Union, Sequence


def get_journey_time(origin: Station, destination: Station) -> Maybe:
    return Option(time_from_db, origin, destination).or_call(time_from_gmaps, origin, destination)


def time_from_db(origin: Station, destination: Station) -> Union[int, None]:
    times = JourneyTime.select().where(JourneyTime.origin == origin.sid and JourneyTime.destination == destination.sid)
    return process_times(times)


def process_times(times: Sequence[JourneyTime]):
    if len(times) == 0: return None
    # TODO: Replace with more sophisticated avaeraging
    return times[0].time


def time_from_gmaps(origin: Station, destination: Station) -> Union[int, None]:
    pipe = F() >> gmaps.build_params(origin) >> gmaps.get_directions >> safe(gmaps.extract_duration) >> bind(secs_to_mins)

    return pipe(destination).value