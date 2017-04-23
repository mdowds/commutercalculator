from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from api.result import set_origin, add_journey_time, validate_result
from api.data import stations
from urllib.parse import unquote_plus
from api.lib.functional import pipeline
from functools import partial

app = Flask(__name__)
ccapi = Api(app)


class JourneysTo(Resource):

    def get(self, destination):
        time_to_dest = partial(add_journey_time, destination)
        build_result = pipeline(set_origin, time_to_dest)

        results = (
            build_result(station)
            for station in stations
            if station != unquote_plus(destination)
        )

        filtered_results = tuple(result for result in results if validate_result(result))

        output = { "results": filtered_results }
        return jsonify(output)


class Hello(Resource):
    def get(self):
        return "Hello world"

ccapi.add_resource(Hello, '/api')
ccapi.add_resource(JourneysTo, '/api/journeys/to/<string:destination>')

@app.errorhandler(404)
def page_not_found(error):
    return 'This route does not exist {}'.format(request.url), 404

if __name__ == '__main__':
    #app.run(debug=True, host='0.0.0.0')
    app.run(debug=True)
