from peewee import IntegerField
from .cc_model import CCModel


class Travelcard(CCModel):
    min_zone = IntegerField()
    max_zone = IntegerField()
    annual_price = IntegerField()
