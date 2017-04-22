from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from api.travel_time import get_travel_time

app = Flask(__name__)
ccapi = Api(app)


class JourneysTo(Resource):
    def get(self, destination):
        stub = { "results": [{"origin": "London Euston", "journeyTime": get_travel_time("London Euston", destination)}] }
        return jsonify(stub)


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
