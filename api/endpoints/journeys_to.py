import re
from typing import Dict, Any, NamedTuple, Tuple
from functools import partial

from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from fn import F
from fnplus import curried, tmap, Either
from peewee import fn, SQL

from api.data import Station, JourneyTime

Result = Dict[str, Any]
JourneyTimeResult = NamedTuple('JourneyTimeResult', (('origin', Station), ('time', int)))


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest):
        destination = (F() >> _sanitise_input >> Either.try_(_get_destination))(dest)

        get_output = (
            F() >>
            Either.try_bind(_get_journey_times) >>
            Either.bind(tmap(_build_result)) >>
            _build_output(destination) >>
            jsonify
        )

        return get_output(destination)


def _get_destination(sid: str) -> Station:
    try:
        return Station.get(Station.sid == sid)
    except Station.DoesNotExist as e:
        raise e


def _build_result(result: JourneyTimeResult) -> Result:
    return {
        "origin": result.origin.serialize(),
        "journeyTime": result.time
    }


def _sanitise_input(input: str) -> str:
    strip_non_alpha = partial(re.sub,'[^a-zA-Z]','')
    sanitise = F() >> strip_non_alpha >> str.upper
    return sanitise(input)


@curried
def _build_output(destination: Either[Station], results: Either[Tuple[Result, ...]]) -> Result:
    if(results.get_error()):
        return _create_error("No station found") if type(results.get_error()) == Station.DoesNotExist else _create_error("Unknown error")

    return {
        "destination": destination.get_value().serialize(),
        "results": results.get_value()
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