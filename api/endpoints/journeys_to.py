from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from api.data import Station, serialize_station
from functools import partial
from api.interfaces import gmaps
from api.lib.functional import Maybe, pipeline, safe, bind
from typing import Dict, Any, Callable

from api.utils import secs_to_mins

Result = Dict[str, Any]


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest_sid):
        stations = Station.select()
        destination = next(filter((lambda s: s.sid == dest_sid), stations)) # Add check for this not matching anything
        origins = tuple(filter((lambda s: s.sid != dest_sid), stations))

        result_to_dest = partial(build_result, partial(get_travel_time, destination))

        results = tuple(map(lambda s: result_to_dest(s), origins))
        filtered_results = tuple(filter(lambda r: validate_result(r), results))

        output = {
            "destination": serialize_station(destination),
            "results": filtered_results
        }

        return jsonify(output)


def build_result(get_time: Callable[[Station], Maybe], origin: Station) -> Result:
    return {
        "origin": serialize_station(origin),
        "journeyTime": get_time(origin).value
    }


def validate_result(result: Result) -> bool:
    return result["origin"] is not None and result["journeyTime"] is not None


def get_travel_time(origin: Station, destination: Station) -> Maybe:
    pipe = pipeline(
        gmaps.get_directions,
        gmaps.extract_response_dict,
        safe(gmaps.extract_duration),
        bind(secs_to_mins)
    )

    return pipe(gmaps.build_params(origin, destination))