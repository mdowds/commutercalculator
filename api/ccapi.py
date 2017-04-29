from flask import Flask, request
from flask_restful import Resource, Api
from api.endpoints import JourneysTo

app = Flask(__name__)
ccapi = Api(app)


class Hello(Resource):
    def get(self):
        return "Hello world"

ccapi.add_resource(Hello, '/api')
ccapi.add_resource(JourneysTo, '/api/journeys/to/<string:dest_sid>')

@app.errorhandler(404)
def page_not_found(error):
    return 'This route does not exist {}'.format(request.url), 404

if __name__ == '__main__':
    #app.run(debug=True, host='0.0.0.0')
    app.run(debug=True)
