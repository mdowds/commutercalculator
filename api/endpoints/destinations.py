from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from fn import F
from fnplus import tmap

from api.data import Station, serialize_station


class Destinations(Resource):

    @cors.crossdomain(origin='*')
    def get(self):
        get_output =  F() >> _get_destinations >> tmap(serialize_station) >> jsonify
        return get_output()


def _get_destinations():
    return Station.select().where((Station.min_zone == 1) | (Station.max_zone == 1)).order_by(Station.name)
