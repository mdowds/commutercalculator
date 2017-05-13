from functools import partial
from typing import Any
from requests import get, Response
from api.utils import dict_value,load_config_value
from api.data import Station
from typing import Dict
from api.lib.functional import curried

get_directions = partial(get, "https://maps.googleapis.com/maps/api/directions/json")
extract_duration = partial(dict_value, ("routes", 0, "legs", 0, "duration", "value"))


def extract_response_dict(response: Response) -> Dict[str, Any]:
    return response.json()


@curried
def build_params(origin: Station, destination: Station) -> Dict[str, str]:
    return {
        "origin": "%s,%s" % (origin.lat, origin.long),
        "destination": "%s,%s" % (destination.lat, destination.long),
        "mode": "transit",
        "key": load_config_value("gmapsApiKey")
    }
