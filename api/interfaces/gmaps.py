from functools import partial
from typing import Dict, Any
from requests import get, Response
from api.utils import dict_value, pipeline


get_directions = partial(get, "https://maps.googleapis.com/maps/api/directions/json")
extract_duration = partial(dict_value, ("routes", 0, "legs", 0, "duration", "value"))


def extract_response_dict(response: Response) -> Dict[str, Any]:
    return response.json()

get_duration = pipeline(get_directions, extract_response_dict, extract_duration)
