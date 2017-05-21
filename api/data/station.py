from peewee import *
from typing import Dict, Any
from api.data.ccdb import db


class Station(Model):
    sid = CharField(primary_key=True)
    name = CharField(null=False)
    lat = DoubleField()
    long = DoubleField()
    postcode = CharField()
    major_station = BooleanField()
    journey_times_updated = DateTimeField()

    class Meta:
        database = db


def serialize_station(station: Station) -> Dict[str, Any]:
    return {
        "id": station.sid,
        "name": station.name,
        "position": {
            "lat": station.lat,
            "lng": station.long
        }
    }
