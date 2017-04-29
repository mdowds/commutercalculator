from peewee import *
import os
from typing import Dict, Any

db = SqliteDatabase(os.path.join(os.getcwd(), 'api', 'data', 'ccdb.sqlite'))


class Station(Model):
    sid = CharField(primary_key=True)
    name = CharField(null=False)
    place_id = CharField()

    class Meta:
        database = db


def serialize_station(station: Station) -> Dict[str, Any]:
    return {
        "sid": station.sid,
        "name": station.name,
        "placeId": station.place_id
    }