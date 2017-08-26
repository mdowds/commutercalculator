from flask import Flask, request
from flask_restful import Resource, Api
from api.destinations import Destinations
from api.journeys.to import JourneysTo

app = Flask(__name__)
ccapi = Api(app)


class Hello(Resource):
    def get(self):
        return "Hello world"

ccapi.add_resource(Hello, '/')
ccapi.add_resource(JourneysTo, '/journeys/to/<string:dest>')
ccapi.add_resource(Destinations, '/destinations')

@app.errorhandler(404)
def page_not_found(error):
    return 'This route does not exist {}'.format(request.url), 404

if __name__ == '__main__':
    #app.run(debug=True, host='0.0.0.0')
    app.run(debug=True)
