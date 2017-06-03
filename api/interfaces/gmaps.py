from collections import namedtuple
from datetime import date, time, datetime
from typing import Union, Any, Dict

from pytz import timezone
import googlemaps

from api.config import load_config_value
from api.data import Station
from api.lib.functional import curried, F, Either
from api.lib.utils import dict_path, next_weekday

JourneyTimeResult = namedtuple('JourneyTimeResult', ('origin', 'time'))


@curried
def get_peak_journey_time(destination: Station, origin: Station) -> Either[JourneyTimeResult]:
    pipe = F() >> _get_peak_time >> _directions_request(origin, destination) >> _extract_journey_time(origin)

    return pipe(date.today())


@curried
def _directions_request(origin: Station, destination: Station, arrival_time: int=None) -> Either:
    @curried
    def _request(origin, destination, arrival_time, g):
        return g.directions(
            "%s,%s" % (origin.lat, origin.long),
            "%s,%s" % (destination.lat, destination.long),
            mode="transit",
            arrival_time=arrival_time
        )

    directions = F() >> Either.try_(load_config_value) >> Either.try_bind(googlemaps.Client) >> Either.try_bind(_request(origin, destination, arrival_time))

    return directions("gmapsApiKey")


@curried
def _extract_journey_time(origin: Station, response: Either) -> Either[JourneyTimeResult]:
    pipe = F() >> Either.bind(dict_path((0, "legs", 0, "duration", "value"))) >> Either.bind(lambda t: int(t/60)) >> Either.bind(lambda t: JourneyTimeResult(origin, t))
    return pipe(response)


def _get_peak_time(base_date: date) -> int:
    day = next_weekday(base_date)
    dt = datetime.combine(day, time(9))
    localised = timezone('Europe/London').localize(dt)
    return int(localised.timestamp())


# @curried
# def _build_params(destination: Station, origin: Station) -> frozendict:
#     return frozendict({
#         "origin": "%s,%s" % (origin.lat, origin.long),
#         "destination": "%s,%s" % (destination.lat, destination.long),
#         "mode": "transit",
#         "key": load_config_value("gmapsApiKey")
#     })


# @curried
# def _add_param(key: str, value: Any, params: frozendict) -> frozendict:
#     return params.add(key, value)





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
