from requests import Response
from api.utils import dict_value,load_config_value, map_, secs_to_mins
from api.data import Station
from typing import Dict, Sequence, List
from api.lib.functional import curried, partial
from collections import namedtuple
import grequests

_directions_url = "https://maps.googleapis.com/maps/api/directions/json"
RequestSettings = namedtuple("RequestSettings", ("params", "callback"))
JourneyTimeResult = namedtuple('JourneyTimeResult', ['origin', 'time'])


@curried
def get_directions_multiple(destination: Station, origins: Sequence[Station]) -> List[JourneyTimeResult]:
    results = []
    settings = map_(_prepare_request(results, destination), origins)
    requests = (grequests.get(_directions_url, params=s.params, callback=s.callback) for s in settings)
    grequests.map(requests, exception_handler=_exception_handler)

    # The callback populates results with JourneyTimeResults
    return results


def _exception_handler(request, exception):
    print(request.url + " failed with exception " + str(exception))


@curried
def _extract_journey_time(times: List, origin: Station, response: Response, *args, **kwargs):
    journey_time = dict_value(("routes", 0, "legs", 0, "duration", "value"), response.json())
    if journey_time is not None: times.append(JourneyTimeResult(origin, secs_to_mins(journey_time)))


@curried
def _prepare_request(times: List, destination: Station, origin: Station) -> RequestSettings:
    return RequestSettings(_build_params(destination, origin), _extract_journey_time(times, origin))


@curried
def _build_params(destination: Station, origin: Station) -> Dict[str, str]:
    return {
        "origin": "%s,%s" % (origin.lat, origin.long),
        "destination": "%s,%s" % (destination.lat, destination.long),
        "mode": "transit",
        "key": load_config_value("gmapsApiKey")
    }
