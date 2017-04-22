from functools import partial
from typing import Dict, Any
from requests import get, Response

directions_request = partial(get, "https://maps.googleapis.com/maps/api/directions/json")


def make_directions_params(origin: str, destination: str, key: str) -> Dict[str, str]:
    return {"origin": origin, "destination": destination, "key": key}


def extract_response_dict(response: Response) -> Dict[str, Any]:
    return response.json()
