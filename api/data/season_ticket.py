from typing import Dict, Any

from peewee import ForeignKeyField, CharField, IntegerField
from .station import Station
from .cc_model import CCModel


class SeasonTicket(CCModel):
    destination = ForeignKeyField(Station)
    origin = CharField()
    annual_price = IntegerField()

    def serialize(self) -> Dict[str, Any]:
        return {"price": self.annual_price}
