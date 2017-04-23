from api.interfaces.gmaps import get_duration
from api.lib.functional import pipeline, safe, bind, Maybe
from api.utils import secs_to_mins, load_config_value


def get_travel_time(origin: str, destination: str) -> Maybe:
    params = {"origin": origin, "destination": destination, "mode": "transit", "key": load_config_value("gmapsApiKey")}
    pipe = pipeline(safe(get_duration), bind(secs_to_mins))

    return pipe(params)
