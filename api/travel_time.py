from api.interfaces.gmaps import get_duration
from api.lib.functional import pipeline
from api.utils import secs_to_mins, load_config_value


def get_travel_time(origin, destination):
    params = {"origin": origin, "destination": destination, "mode": "transit", "key": load_config_value("gmapsApiKey")}
    pipe = pipeline(get_duration, secs_to_mins)

    return pipe(params)
