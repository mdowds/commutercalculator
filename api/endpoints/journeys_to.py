from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from api.data import Station, serialize_station
from api.lib.functional import curried, F, partial
from typing import Dict, Any
from api.utils import create_error, filter_, map_, find
from api.services import get_journey_time
import re

Result = Dict[str, Any]


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest_in):
        dest_sid = sanitise_input(dest_in)

        stations = Station.select()

        try:
            destination = find((lambda s: s.sid == dest_sid), stations)
        except StopIteration:
            return jsonify(create_error("No station found"))

        origins = filter_(lambda s: s.sid != dest_sid, stations)
        results_for = F() >> map_(build_result(destination)) >> filter_(validate_result)

        output = {
            "destination": serialize_station(destination),
            "results": results_for(origins)
        }

        return jsonify(output)


@curried
def build_result(destination: Station, origin: Station) -> Result:
    return {
        "origin": serialize_station(origin),
        "journeyTime": get_journey_time(destination, origin)
    }


def sanitise_input(input: str) -> str:
    strip_non_alpha = partial(re.sub,'[^a-zA-Z]','')
    sanitise = F() >> strip_non_alpha >> str.upper
    return sanitise(input)


def validate_result(result: Result) -> bool:
    return result["origin"] is not None and result["journeyTime"] is not None
