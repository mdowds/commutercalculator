from flask import Flask, jsonify
from flask_restful import Resource, Api
from api.result import Result

app = Flask(__name__)
ccapi = Api(app)


class JourneysTo(Resource):
    def get(self, station):
        stub = { "results": [Result("King's Cross").__dict__] }
        return jsonify(stub)


class Hello(Resource):
    def get(self):
        return "Hello world"

ccapi.add_resource(Hello, '/')
ccapi.add_resource(JourneysTo, '/journeys/to/<string:station>')

if __name__ == '__main__':
     app.run(debug=True)