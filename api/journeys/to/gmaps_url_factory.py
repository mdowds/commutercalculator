import urllib

_base_url = "https://www.google.com/maps/dir/?api=1"


def make_gmaps_direction_url(origin: str, destination: str) -> str:
    origin_str = urllib.parse.quote_plus(origin)
    dest_str = urllib.parse.quote_plus(destination)

    return _base_url + "&origin={}+Station,London&destination={}+Station,London&travelmode=transit".format(origin_str, dest_str)
