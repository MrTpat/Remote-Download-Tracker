from flask import Flask
from flask import request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

dls = {}
counter = -1
@app.route('/', methods=['POST'])
def default():
    global dls
    inp = request.get_json()
    dls[inp['id']] = inp['all_downloads']
    return {'message': 'success'}

@app.route('/<idx>')
def my_view_func(idx):
    global dls
    if (int(idx) not in dls):
        return '<h1>NOT A VALID ID!</h1>'
    data = dls[int(idx)]
    if len(data) == 0:
        return '<h1>NO ACTIVE DOWNLOADS!</h1>'
    ret = ''
    for x in data:
        filename = x['filename'].split('/')[-1]
        ret += '<h2>' + filename + ': ' + str(round(x['bytesReceived'] * 100 / x['totalBytes'], 2)) + '%</h2>'
    print(ret)
    return ret

@app.route('/getID', methods=['GET'])
def getID():
    global counter
    counter += 1
    dls[counter] = []
    return {'id': counter}
    