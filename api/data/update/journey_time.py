from api.data import Station
from api.utils import filter_, map_
from api.services.journey_time import update_journey_time
from api.lib.functional import curried
from typing import Sequence
import datetime


def _update(all_stations: Sequence[Station], destination: Station):
    print("Updating " + destination.name)
    origins = filter_(lambda s: s.sid != destination.sid, all_stations)
    times = map_(_update_origin(destination), origins)
    print(str(len(times)) + " times inserted")
    destination.journey_times_updated = datetime.datetime.now()
    destination.save()


@curried
def _update_origin(destination: Station, origin: Station):
    print("Getting time for " + origin.name + " to " + destination.name)
    return update_journey_time(origin, destination)


stations_to_update = Station.select()\
    .where((Station.min_zone == 1) | (Station.max_zone == 1))\
    .order_by(Station.journey_times_updated)\
    .limit(3)

all_stations = Station.select().order_by(Station.name)

for terminal in stations_to_update: _update(all_stations, terminal)
