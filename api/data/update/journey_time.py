from api.data import Station
from api.utils import filter_
from api.services.journey_time import update_journey_times
from typing import Sequence
import datetime


def _update(all_stations: Sequence[Station], destination: Station):
    print("Updating " + destination.name)
    origins = filter_(lambda s: s.sid != destination.sid, all_stations)
    times = update_journey_times(destination, origins)
    print(str(len(times)) + " times inserted")
    destination.journey_times_updated = datetime.datetime.now()
    destination.save()


terminals_to_update = Station.select().where(Station.major_station == True).order_by(Station.journey_times_updated).limit(3)
all_stations = Station.select().order_by(Station.name)

for terminal in terminals_to_update: _update(all_stations, terminal)
