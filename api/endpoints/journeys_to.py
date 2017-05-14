from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from api.data import Station, serialize_station
from api.lib.functional import F, partial, curried
from typing import Dict, Any, List
from api.utils import create_error, filter_, find, map_
from api.services import get_journey_times, JourneyTimeResult
import re

Result = Dict[str, Any]


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest_in):
        dest_sid = _sanitise_input(dest_in)

        stations = Station.select()

        try:
            destination = find((lambda s: s.sid == dest_sid), stations)
        except StopIteration:
            return jsonify(create_error("No station found"))

        origins = filter_(lambda s: s.sid != dest_sid, stations)

        output_pipe = F() >> get_journey_times(destination) >> filter_(lambda j: j is not None) >> map_(_build_result) >>  _build_output(destination) >> jsonify

        return output_pipe(origins)


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
