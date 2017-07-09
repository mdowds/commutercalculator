from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors
from fn import F
from fnplus import tmap

from api.data import Station, serialize_station


class Destinations(Resource):

    @cors.crossdomain(origin='*')
    def get(self):
        destinations = Station.select().where(Station.major_station == True).order_by(Station.name)
        output_pipe =  F() >> tmap(serialize_station) >> jsonify
        return output_pipe(destinations)
