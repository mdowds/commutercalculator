from peewee import CharField, DoubleField, BooleanField, DateTimeField, IntegerField
from typing import Dict, Any
from .cc_model import CCModel


class Station(CCModel):
    sid = CharField(primary_key=True)
    name = CharField(null=False)
    lat = DoubleField()
    long = DoubleField()
    postcode = CharField()
    major_station = BooleanField()
    journey_times_updated = DateTimeField()
    min_zone = IntegerField()
    max_zone = IntegerField()

    def serialize(self) -> Dict[str, Any]:
        return {
            "id": self.sid,
            "name": self.name,
            "position": {
                "lat": self.lat,
                "lng": self.long
            }
        }


def serialize_station(station: Station) -> Dict[str, Any]:
    return station.serialize()
