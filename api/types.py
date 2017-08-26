from typing import NamedTuple, Dict, Any, Optional

from api.data import Travelcard, SeasonTicket
from .data import Station

JourneyResult = NamedTuple('JourneyResult', (
    ('origin', Station),
    ('time', int),
    ('travelcard', Optional[Travelcard]),
    ('season_ticket', Optional[SeasonTicket])
))

JourneysToArgs = NamedTuple('JourneysToArgs', (
    ('min_time', int),
    ('max_time', int)
))

TravelcardForJourney = NamedTuple('TravelcardForJourney', (
    ('origin', Station),
    ('destination', Station),
    ('travelcard', Optional[Travelcard])
))

OutputDict = Dict[str, Any]
