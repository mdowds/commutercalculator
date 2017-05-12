from peewee import *
import os
from typing import Dict, Any

db = SqliteDatabase(os.path.join(os.getcwd(), 'api', 'data', 'ccdb.sqlite'))


class Station(Model):
    sid = CharField(primary_key=True)
    name = CharField(null=False)
    lat = DoubleField()
    long = DoubleField()
    postcode = CharField()

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