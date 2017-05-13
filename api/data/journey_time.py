from peewee import *
from api.data.ccdb import db


class JourneyTime(Model):
    origin = CharField()
    destination = CharField()
    time = IntegerField()

    class Meta:
        database = db
