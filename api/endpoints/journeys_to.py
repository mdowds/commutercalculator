from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from api.data import Station, serialize_station
from functools import partial
from api.lib.functional import Maybe, pipeline
from typing import Dict, Any, Callable
from api.utils import create_error, tuple_filter, tuple_map
from api.services import get_journey_time
import re

Result = Dict[str, Any]


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest_in):
        dest_sid = sanitise_input(dest_in)

        stations = Station.select()

        try:
            destination = next(filter((lambda s: s.sid == dest_sid), stations))
        except StopIteration:
            return jsonify(create_error("No station found"))

        extract_origins = partial(tuple_filter, lambda s: s.sid != dest_sid)
        get_result = partial(build_result, partial(get_journey_time, destination))
        get_results = partial(tuple_map, get_result)
        filter_results = partial(tuple_filter, validate_result)

        assemble_results = pipeline(extract_origins, get_results, filter_results)

        output = {
            "destination": serialize_station(destination),
            "results": assemble_results(stations)
        }

        return jsonify(output)


def build_result(get_time: Callable[[Station], Maybe], origin: Station) -> Result:
    return {
        "origin": serialize_station(origin),
        "journeyTime": get_time(origin).value
    }


def sanitise_input(input: str) -> str:
    strip_non_alpha = partial(re.sub,'[^a-zA-Z]','')
    sanitise = pipeline(strip_non_alpha, str.upper)
    return sanitise(input)


def validate_result(result: Result) -> bool:
    return result["origin"] is not None and result["journeyTime"] is not None
