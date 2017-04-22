import api.interfaces.gmaps as gmaps
from api.utils import secs_to_mins, dict_value, load_config_value


def get_travel_time(origin, destination):
    params = {"origin": origin, "destination": destination, "mode": "transit", "key": load_config_value("gmapsApiKey")}
    response = gmaps.directions_request(params)
    response_dict = gmaps.extract_response_dict(response)
    time = dict_value(("routes", 0, "legs", 0, "duration", "value"), response_dict)
    return secs_to_mins(time)


