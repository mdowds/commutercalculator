from typing import NamedTuple, Tuple, Dict, Union, Sequence
from .data import Station

JourneyResult = NamedTuple('JourneyResult', (
    ('origin', Station),
    ('time', int),
    ('price', int)
))

JourneyResults = NamedTuple('JourneyResults', (
    ('destination', Station),
    ('results', Tuple[JourneyResult, ...])
))

JourneysToArgs = NamedTuple('JourneysToArgs', (
    ('min_time', int),
    ('max_time', int)
))

_OutputTypes = Union[str, int, float]
OutputDict = Dict[str, Union[_OutputTypes, Sequence[_OutputTypes]]]
