import re
from typing import Dict, Any, NamedTuple, Tuple, Union
from functools import partial

from flask import jsonify
from flask_restful import Resource, reqparse
from flask_restful.utils import cors
from fn import F
from fnplus import curried, tmap, Either
from peewee import fn, SQL

from api.data import Station, JourneyTime

# Type defs
Result = Dict[str, Any]
JourneyTimeResult = NamedTuple('JourneyTimeResult', (('origin', Station), ('time', int)))
JourneysToArgs = NamedTuple('JourneysToArgs', (('min_time', int), ('max_time', int)))

# Constants
DEFAULT_MIN_TIME = 0
DEFAULT_MAX_TIME = 999

# Argument parser setup
parser = reqparse.RequestParser()
parser.add_argument('min_time', type=int)
parser.add_argument('max_time', type=int)


class JourneysTo(Resource):

    @cors.crossdomain(origin='*')
    def get(self, dest):
        args = _parse_args(parser.parse_args())
        destination = (F() >> _sanitise_input >> Either.try_(_get_destination))(dest)

        get_output = (
            F() >>
            Either.try_bind(_get_journey_times(args.min_time, args.max_time)) >>
            Either.bind(tmap(_build_result)) >>
            _build_output(destination) >>
            jsonify
        )

        return get_output(destination)


def _parse_args(args: Dict[str, Union[int, None]]) -> JourneysToArgs:
    def _is_time_arg_valid(arg: Union[int, None]) -> bool:
        return arg is not None and arg >= 0

    min_time = args['min_time'] if _is_time_arg_valid(args['min_time']) else DEFAULT_MIN_TIME
    max_time = args['max_time'] if _is_time_arg_valid(args['max_time']) else DEFAULT_MAX_TIME
    return JourneysToArgs(min_time, max_time)


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


@curried
def _get_journey_times(min_time: int, max_time: int, destination: Station) -> Tuple[JourneyTimeResult, ...]:
    times = JourneyTime\
        .select(JourneyTime.origin, fn.Avg(JourneyTime.time).alias('time'))\
        .join(Station)\
        .where(JourneyTime.destination == destination.sid, JourneyTime.time > min_time, JourneyTime.time < max_time)\
        .group_by(JourneyTime.origin)\
        .order_by(SQL('time'))

    return tmap(lambda t: JourneyTimeResult(t.origin, t.time), times)