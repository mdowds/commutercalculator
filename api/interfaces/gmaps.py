from collections import namedtuple
from datetime import date, time, datetime
from typing import Union

import requests
from frozendict import frozendict
from pytz import timezone

from api.config import load_config_value
from api.data import Station
from api.lib.functional import curried, F
from api.lib.utils import dict_path, secs_to_mins, next_weekday

RequestSettings = namedtuple("RequestSettings", ("params", "callback"))
JourneyTimeResult = namedtuple('JourneyTimeResult', ('origin', 'time'))

_directions_url = "https://maps.googleapis.com/maps/api/directions/json"
_partial_get = F(requests.get, _directions_url)


@curried
def get_peak_journey_time(destination: Station, origin: Station) -> JourneyTimeResult:
    arrival = _get_peak_time(date.today())
    pipe = F() >> _build_params(destination) >> _add_arrival_param(arrival) >> _partial_get >> _extract_journey_time(origin)
    return pipe(origin)


@curried
def get_journey_time(destination: Station, origin: Station) -> JourneyTimeResult:
    pipe = F() >> _build_params(destination) >> _partial_get >> _extract_journey_time(origin)
    return pipe(origin)


@curried
def _extract_journey_time(origin: Station, response: requests.Response) -> Union[JourneyTimeResult, None]:
    time = dict_path(("routes", 0, "legs", 0, "duration", "value"), response.json())
    if time is None: return None
    return JourneyTimeResult(origin, secs_to_mins(time))


@curried
def _build_params(destination: Station, origin: Station) -> frozendict:
    return frozendict({
        "origin": "%s,%s" % (origin.lat, origin.long),
        "destination": "%s,%s" % (destination.lat, destination.long),
        "mode": "transit",
        "key": load_config_value("gmapsApiKey")
    })


@curried
def _add_arrival_param(arrival: int, params: frozendict) -> frozendict:
    return params.copy(arrival_time=arrival)


def _get_peak_time(base_date: date) -> int:
    day = next_weekday(base_date)
    dt = datetime.combine(day, time(9))
    localised = timezone('Europe/London').localize(dt)
    return int(localised.timestamp())


### Functions for multiple concurrent requests
### Currently not being used

# @curried
# def get_journey_time_multiple(destination: Station, origins: Sequence[Station]) -> List[JourneyTimeResult]:
#     results = []
#     settings = map_(_prepare_request(results, destination), origins)
#     requests = (grequests.get(_directions_url, params=s.params, callback=s.callback) for s in settings)
#     grequests.map(requests, exception_handler=_exception_handler)
#
#     # The callback populates results with JourneyTimeResults
#     print(results)
#     return results
#
#
# @curried
# def _prepare_request(times: List, destination: Station, origin: Station) -> RequestSettings:
#     return RequestSettings(_build_params(destination, origin), _extract_journey_times(times, origin))
#
#
# def _exception_handler(request, exception):
#     print(request.url + " failed with exception " + str(exception))
#     print(request.params)
#
# @curried
# def _extract_journey_times(times: List, origin: Station, response: requests.Response, *args, **kwargs) -> List:
#     journey_time = _extract_journey_time(origin, response)
#     if journey_time is not None: times.append(journey_time)
#     return times
