from typing import Dict, Any

from peewee import IntegerField

from .cc_model import CCModel


class Travelcard(CCModel):
    min_zone = IntegerField()
    max_zone = IntegerField()
    annual_price = IntegerField()

    def serialize(self) -> Dict[str, Any]:
        return {
            "minZone": self.min_zone,
            "maxZone": self.max_zone,
            "price": self.annual_price
        }
