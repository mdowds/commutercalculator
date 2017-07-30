from peewee import ForeignKeyField, CharField, IntegerField
from .station import Station
from .cc_model import CCModel


class SeasonTicket(CCModel):
    origin = ForeignKeyField(Station)
    destination = CharField()
    annual_price = IntegerField()
