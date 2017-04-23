from .travel_time import get_travel_time
from typing import Dict, Union

Result = Dict[str, Union[str, int]]


def set_origin(origin: str) -> Result:
    return {"origin": origin}


def add_journey_time(destination: str, result: Result) -> Result:
    result["journeyTime"] = get_travel_time(result["origin"], destination).value
    return result


def validate_result(result: Result) -> bool:
    return result["origin"] is not None and result["journeyTime"] is not None
