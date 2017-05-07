from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from api.data import Station, serialize_station
from functools import partial
from api.interfaces import gmaps
from api.lib.functional import Maybe, pipeline, safe, bind
from typing import Dict, Any, Callable
from api.utils import secs_to_mins, create_error, tuple_filter, tuple_map

Result = Dict[str, Any]


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest_sid):
        stations = Station.select()

        try:
            destination = next(filter((lambda s: s.sid == dest_sid), stations))
        except StopIteration:
            return jsonify(create_error("No station found"))

        extract_origins = partial(tuple_filter, lambda s: s.sid != dest_sid)
        get_result = partial(build_result, partial(get_travel_time, destination))
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


def validate_result(result: Result) -> bool:
    return result["origin"] is not None and result["journeyTime"] is not None


def get_travel_time(origin: Station, destination: Station) -> Maybe:

    params_with_origin = partial(gmaps.build_params, origin)

    pipe = pipeline(
        params_with_origin,
        gmaps.get_directions,
        gmaps.extract_response_dict,
        safe(gmaps.extract_duration),
        bind(secs_to_mins)
    )

    return pipe(destination)