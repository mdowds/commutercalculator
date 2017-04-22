from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from api.travel_time import get_travel_time
from api.data import stations
from urllib.parse import unquote_plus

app = Flask(__name__)
ccapi = Api(app)


class JourneysTo(Resource):
    def get(self, destination):
        origins = filter(lambda s: s != unquote_plus(destination), stations)
        results = tuple(map(lambda s: {"origin": s, "journeyTime": get_travel_time(s, destination)}, origins))

        output = { "results": results }
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
