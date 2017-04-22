from api.interfaces.gmaps import get_directions, extract_response_dict
from api.utils import secs_to_mins, dict_value, load_config_value, pipeline
from functools import partial


def get_travel_time(origin, destination):
    params = {"origin": origin, "destination": destination, "mode": "transit", "key": load_config_value("gmapsApiKey")}
    extract_duration = partial(dict_value, ("routes", 0, "legs", 0, "duration", "value"))
    pipe = pipeline(get_directions, extract_response_dict, extract_duration, secs_to_mins)

    return pipe(params)
