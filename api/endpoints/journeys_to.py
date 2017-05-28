from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from api.data import Station, serialize_station
from api.lib.functional import F, partial, curried
from typing import Dict, Any, List
from api.utils import create_error, map_
from api.services import get_journey_times, JourneyTimeResult
import re

Result = Dict[str, Any]


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest):
        try:
            destination = Station.get(Station.sid == _sanitise_input(dest))
        except Station.DoesNotExist:
            return jsonify(create_error("No station found"))

        output_pipe = F() >> get_journey_times >> map_(_build_result) >>  _build_output(destination) >> jsonify

        return output_pipe(destination)


def _build_result(time: JourneyTimeResult) -> Result:
    return {
        "origin": serialize_station(time.origin),
        "journeyTime": time.time
    }


def _sanitise_input(input: str) -> str:
    strip_non_alpha = partial(re.sub,'[^a-zA-Z]','')
    sanitise = F() >> strip_non_alpha >> str.upper
    return sanitise(input)


@curried
def _build_output(destination: Station, results: List[Result]) -> Dict[str, Any]:
    return {
        "destination": serialize_station(destination),
        "results": results
    }
