from typing import NamedTuple, Dict, Any, Optional

from api.data import Travelcard
from .data import Station

JourneyResult = NamedTuple('JourneyResult', (
    ('origin', Station),
    ('time', int),
    ('travelcard', Optional[Travelcard]),
))

JourneysToArgs = NamedTuple('JourneysToArgs', (
    ('min_time', int),
    ('max_time', int)
))

JourneyPrice = NamedTuple('JourneyPrice', (
    ('origin', Station),
    ('destination', Station),
    ('travelcard', Optional[Travelcard])
))

OutputDict = Dict[str, Any]
