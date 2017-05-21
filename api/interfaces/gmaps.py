from requests import Response, get
from api.utils import dict_value,load_config_value, map_, secs_to_mins
from api.data import Station
from typing import Dict, Sequence, List, Union
from api.lib.functional import curried
from collections import namedtuple
import grequests

_directions_url = "https://maps.googleapis.com/maps/api/directions/json"
RequestSettings = namedtuple("RequestSettings", ("params", "callback"))
JourneyTimeResult = namedtuple('JourneyTimeResult', ('origin', 'time'))


@curried
def get_journey_time_multiple(destination: Station, origins: Sequence[Station]) -> List[JourneyTimeResult]:
    results = []
    settings = map_(_prepare_request(results, destination), origins)
    requests = (grequests.get(_directions_url, params=s.params, callback=s.callback) for s in settings)
    grequests.map(requests, exception_handler=_exception_handler)

    # The callback populates results with JourneyTimeResults
    print(results)
    return results


@curried
def get_journey_time(destination: Station, origin: Station) -> JourneyTimeResult:
    print("Getting time for " + origin.name + " to " + destination.name)
    res = get(_directions_url, _build_params(destination, origin))
    return _extract_journey_time(origin, res)


def _exception_handler(request, exception):
    print(request.url + " failed with exception " + str(exception))
    print(request.params)


@curried
def _extract_journey_times(times: List, origin: Station, response: Response, *args, **kwargs) -> List:
    journey_time = _extract_journey_time(origin, response)
    if journey_time is not None: times.append(journey_time)
    return times


@curried
def _extract_journey_time(origin: Station, response: Response) -> Union[JourneyTimeResult, None]:
    time = dict_value(("routes", 0, "legs", 0, "duration", "value"), response.json())
    if time is None: return None
    return JourneyTimeResult(origin, secs_to_mins(time))


@curried
def _prepare_request(times: List, destination: Station, origin: Station) -> RequestSettings:
    return RequestSettings(_build_params(destination, origin), _extract_journey_times(times, origin))


@curried
def _build_params(destination: Station, origin: Station) -> Dict[str, str]:
    return {
        "origin": "%s,%s" % (origin.lat, origin.long),
        "destination": "%s,%s" % (destination.lat, destination.long),
        "mode": "transit",
        "key": load_config_value("gmapsApiKey")
    }
