from flask import jsonify
from flask_restful import Resource
from flask_restful.utils import cors

from api.data import Station, serialize_station
from api.lib.functional import F
from api.lib.utils import map_


class Destinations(Resource):

    @cors.crossdomain(origin='*')
    def get(self):
        destinations = Station.select().where(Station.major_station == True).order_by(Station.name)
        output_pipe =  F() >> map_(serialize_station) >> jsonify
        return output_pipe(destinations)
