from peewee import Model, ForeignKeyField, CharField, IntegerField
from api.data.ccdb import db
from .station import Station


class JourneyTime(Model):
    origin = ForeignKeyField(Station)
    destination = CharField()
    time = IntegerField()

    class Meta:
        database = db
