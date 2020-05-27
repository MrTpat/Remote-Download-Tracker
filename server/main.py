from flask import Flask
from flask import request
import json
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

dls = {}
counter = -1
@app.route('/', methods=['POST', 'GET'])
def default():
    global dls
    if request.method == 'POST':
        inp = request.get_json()
        dls[inp['id']] = inp['all_downloads']
        return {'message': 'success'}
    elif request.method == 'GET':
        return {'data': dls[inp['id']]}


@app.route('/getID', methods=['GET'])
def getID():
    global counter
    counter += 1
    return {'id': counter}
    