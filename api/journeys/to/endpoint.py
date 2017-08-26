import re
from functools import partial
from typing import Dict, Optional, Tuple

from flask import jsonify
from flask_restful import Resource, reqparse
from flask_restful.utils import cors
from fn import F
from fnplus import tmap, Either, find, curried

from api.data import Station, JourneyTime, SeasonTicket
from api.journeys.to.datafetcher import get_journey_times, get_destination, get_travelcard_prices, \
    get_season_ticket_prices
from api.types import JourneysToArgs, JourneyResult, OutputDict, TravelcardForJourney

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
        destination = Either.fromfunction(get_destination, _sanitise_input(dest))

        journey_times = destination.call(get_journey_times(args.min_time, args.max_time))
        origins = tuple(journey.origin for journey in journey_times.value) if journey_times.value else None
        travelcards = destination.call(get_travelcard_prices(origins)) if origins else None
        season_tickets = destination.call(get_season_ticket_prices(origins)) if origins else None

        output = _build_output(destination, journey_times, travelcards, season_tickets)

        return jsonify(output)


def _parse_args(args: Dict[str, Optional[int]]) -> JourneysToArgs:
    def _is_time_arg_valid(arg: Optional[int]) -> bool:
        return arg is not None and arg >= 0

    min_time = args['min_time'] if _is_time_arg_valid(args['min_time']) else DEFAULT_MIN_TIME
    max_time = args['max_time'] if _is_time_arg_valid(args['max_time']) else DEFAULT_MAX_TIME
    return JourneysToArgs(min_time, max_time)


def _sanitise_input(input: str) -> str:
    strip_non_alpha = partial(re.sub,'[^a-zA-Z]','')
    sanitise = F() >> strip_non_alpha >> str.upper
    return sanitise(input)


def _build_output(destination: Either[Station],
                  journey_times: Either[Tuple[JourneyTime, ...]],
                  travelcards: Either[Tuple[TravelcardForJourney, ...]],
                  season_tickets: Either[Tuple[SeasonTicket, ...]]) -> OutputDict:

    if journey_times.error:
        # print(journey_times.error)
        return _create_error("No station found") if type(journey_times.error) == Station.DoesNotExist else _create_error("Unknown error")
    results = tmap(_join_data(travelcards.value, season_tickets.value), journey_times.value)

    return {
        "destination": destination.value.serialize(),
        "results": tmap(_build_result, results)
    }


@curried
def _join_data(
        travelcards_for_journey: Tuple[TravelcardForJourney, ...],
        season_tickets: Tuple[SeasonTicket, ...],
        time: JourneyTime) -> JourneyResult:

    travelcard_for_journey = find(lambda t: t.origin == time.origin, travelcards_for_journey)
    travelcard_result = travelcard_for_journey.travelcard if travelcard_for_journey else None
    season_ticket = find(lambda st: st.origin == time.origin.sid, season_tickets) if season_tickets else None

    return JourneyResult(time.origin, time.time, travelcard_result, season_ticket)


def _build_result(result: JourneyResult) -> OutputDict:
    return {
        "origin": result.origin.serialize(),
        "journeyTime": result.time,
        "seasonTickets": {
            "travelcard": result.travelcard.serialize() if result.travelcard else None,
            "seasonTicket": result.season_ticket.serialize() if result.season_ticket else None
        }
    }


def _create_error(message: str) -> OutputDict:
    return {"error": message}
