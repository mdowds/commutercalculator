import datetime
import sys
from typing import Sequence
from collections import namedtuple

from api.data import Station, JourneyTime
from api.lib.functional import curried, F
from api.lib.utils import filter_, map_
from api.services.journey_time import update_journey_time

Output = namedtuple('Output', ('destination', 'times'))


def _update(all_stations: Sequence[Station], destination: Station):
    origins = filter_(lambda s: s.sid != destination.sid, all_stations)
    times = map_(_update_origin(destination), origins)
    # times = [_update_origin(destination, origins[0])]

    if len(times) > 0:
        destination.journey_times_updated = datetime.datetime.now()
        destination.save()

    return Output(destination.name, str(len(times)))


@curried
def _update_origin(destination: Station, origin: Station) -> JourneyTime:
    # print("Getting time for " + origin.name + " to " + destination.name)
    update = update_journey_time(destination, origin)
    if update.get_error():
        print("Error: " + update.get_error())
        sys.exit(1)

    return update.get_value()


stations_to_update = Station.select()\
    .where((Station.min_zone == 1) | (Station.max_zone == 1))\
    .order_by(Station.journey_times_updated)\
    .limit(3)

all_stations = Station.select().order_by(Station.name)

join = lambda x: ", ".join(x)
update_pipe = F() >> \
              map_(lambda station: _update(all_stations, station)) >> \
              map_(lambda update: update.destination + " (" + update.times + ")") >> \
              join

print("Updated journey times for " + update_pipe(stations_to_update[0]))
