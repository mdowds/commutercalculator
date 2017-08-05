import re
from typing import Dict, Optional
from functools import partial

from flask import jsonify
from flask_restful import Resource, reqparse
from flask_restful.utils import cors
from fn import F
from fnplus import curried, tmap, Either, tfilter
from peewee import fn, SQL

from api.data import Station, JourneyTime, Travelcard
from api.types import JourneysToArgs, JourneyResults, JourneyResult, OutputDict

# Constants
DEFAULT_MIN_TIME = 0
DEFAULT_MAX_TIME = 999
NO_PRICE_FOUND = -1

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
            Either.try_bind(_get_journey_prices) >>
            _build_output >>
            jsonify
        )

        return get_output(destination)


def _parse_args(args: Dict[str, Optional[int]]) -> JourneysToArgs:
    def _is_time_arg_valid(arg: Optional[int]) -> bool:
        return arg is not None and arg >= 0

    min_time = args['min_time'] if _is_time_arg_valid(args['min_time']) else DEFAULT_MIN_TIME
    max_time = args['max_time'] if _is_time_arg_valid(args['max_time']) else DEFAULT_MAX_TIME
    return JourneysToArgs(min_time, max_time)


def _get_destination(sid: str) -> Station:
    try:
        return Station.get(Station.sid == sid)
    except Station.DoesNotExist as e:
        raise e


def _sanitise_input(input: str) -> str:
    strip_non_alpha = partial(re.sub,'[^a-zA-Z]','')
    sanitise = F() >> strip_non_alpha >> str.upper
    return sanitise(input)


def _build_output(results: Either[JourneyResults]) -> OutputDict:
    if results.get_error():
        print(results.get_error())
        return _create_error("No station found") if type(results.get_error()) == Station.DoesNotExist else _create_error("Unknown error")

    return {
        "destination": results.get_value().destination.serialize(),
        "results": tmap(_build_result, results.get_value().results)
    }


def _build_result(result: JourneyResult) -> OutputDict:
    price = result.price if result.price != NO_PRICE_FOUND else None

    return {
        "origin": result.origin.serialize(),
        "journeyTime": result.time,
        "seasonTicket": {"price": price}
    }


def _create_error(message: str) -> OutputDict:
    return {"error": message}


@curried
def _get_journey_times(min_time: int, max_time: int, destination: Station) -> JourneyResults:
    times = JourneyTime\
        .select(JourneyTime.origin, fn.Avg(JourneyTime.time).alias('time'))\
        .join(Station)\
        .where(JourneyTime.destination == destination.sid, JourneyTime.time > min_time, JourneyTime.time < max_time)\
        .group_by(JourneyTime.origin)\
        .order_by(SQL('time'))

    results = tmap(lambda t: JourneyResult(t.origin, t.time, NO_PRICE_FOUND), times)

    return JourneyResults(destination, results)


@curried
def _get_journey_prices(existing_results: JourneyResults) -> JourneyResults:
    travelcards = Travelcard.select()

    def _price_for_journey(origin: Station, destination: Station) -> int:
        if origin.min_zone is None: return NO_PRICE_FOUND

        possible_prices = tfilter(lambda t: (
            (t.min_zone==destination.max_zone and t.max_zone==origin.min_zone) or
            (t.min_zone==destination.min_zone and t.max_zone==origin.max_zone)
        ), travelcards)

        sorted_prices = sorted(possible_prices, key=lambda t: t.annual_price)
        if len(sorted_prices) == 0: print(origin.name)

        return sorted_prices[0].annual_price

    new_results = tmap(lambda r: JourneyResult(r.origin, r.time, _price_for_journey(r.origin, existing_results.destination)), existing_results.results)

    return JourneyResults(existing_results.destination, new_results)
