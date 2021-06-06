import numpy as np
from flask import Flask, request, jsonify, render_template
from sklearn.metrics import mean_absolute_error, mean_squared_error
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from graph import init_graph2
from HITS import HITS

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def smape(A, F):
    tmp = 2 * np.abs(F - A) / (np.abs(A) + np.abs(F))
    len_ = np.count_nonzero(~np.isnan(tmp))
    return 100 / len_ * np.nansum(tmp)


def mean_absolute_percentage_error(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.nanmean(np.abs((y_true - y_pred) / y_true)) * 100

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/matrix')
def matrix():
    return render_template('matrix.html')

@app.route('/graph')
def graph():
    return render_template('graph.html')


@app.route('/matrix', methods=['POST'])
@cross_origin(origin='*')
def create_graph():
    if request.method == 'POST':
        params = [x for x in request.form.values()]
        mat = str(params[0])
        tempLetter = int(params[1])
        print(mat)
        hits = HITS(mat)
        hits.parse_str()
        auth_list, hub_list, name_list = hits.run(n_iter=100)
        print(auth_list)
        print(hub_list)
        print("a<",name_list)
        return render_template('matrix.html', mat=mat, auth_list=auth_list, hub_list=hub_list, name_list=name_list, tempLetter=tempLetter)


@app.route('/graph', methods=['POST'])
@cross_origin(origin='*')
def create_graph_anim():
    if request.method == 'POST':
        params = [x for x in request.form.values()]
        print("params: ", params)
        mat = str(params[0])
        hits = HITS(mat)
        hits.parse_json()
        auth_list, hub_list, name_list = hits.run(n_iter=100)
        print("mat: ", mat)
        print("auth_list: ", auth_list)
        print("hub_list: ", hub_list)
        print("name_list: ",name_list)
        return render_template('graph.html', mat=mat, auth_list=auth_list, hub_list=hub_list, name_list=name_list)


# No caching at all for API endpoints.
@app.after_request
def add_header(response):
    # response.cache_control.no_store = True
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
