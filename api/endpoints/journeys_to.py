import re
from typing import Dict, Any, List, NamedTuple, Tuple
from functools import partial

from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from fn import F
from fnplus import curried, tmap
from peewee import fn, SQL

from api.data import Station, serialize_station, JourneyTime

Result = Dict[str, Any]
JourneyTimeResult = NamedTuple('JourneyTimeResult', (('origin', Station), ('time', int)))


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest):
        try:
            destination = Station.get(Station.sid == _sanitise_input(dest))
        except Station.DoesNotExist:
            return jsonify(_create_error("No station found"))

        output_pipe = F() >> _get_journey_times >> tmap(_build_result) >> _build_output(destination) >> jsonify

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
def _build_output(destination: Station, results: List[Result]) -> Result:
    return {
        "destination": serialize_station(destination),
        "results": results
    }


def _create_error(message: str) -> Dict[str, str]:
    return {"error": message}


def _get_journey_times(destination: Station) -> Tuple[JourneyTimeResult, ...]:
    times = JourneyTime\
        .select(JourneyTime.origin, fn.Avg(JourneyTime.time).alias('time'))\
        .join(Station)\
        .where(JourneyTime.destination == destination.sid)\
        .group_by(JourneyTime.origin)\
        .order_by(SQL('time'))

    return tmap(lambda t: JourneyTimeResult(t.origin, t.time), times)