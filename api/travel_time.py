from api.interfaces.gmaps import get_duration
from api.utils import secs_to_mins, load_config_value, pipeline


def get_travel_time(origin, destination):
    params = {"origin": origin, "destination": destination, "mode": "transit", "key": load_config_value("gmapsApiKey")}
    pipe = pipeline(get_duration, secs_to_mins)

    return pipe(params)
