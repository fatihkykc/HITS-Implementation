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


@app.route('/upload-graph', methods=['POST'])
def upload_graph():
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
    auth_list, hub_list = HITS(f.filename).run(n_iter=100)
    # res = auth_list + hub_list
    # print(auth_list)
    # print(hub_list)
    return render_template('main.html')


@app.route('/create-graph', methods=['POST'])
@cross_origin(origin='*')
def create_graph():
    if request.method == 'POST':
        params = [x for x in request.form.values()]
        mat = str(params[0])
        temp = int(params[1])
        print(mat)
        hits = HITS(mat)
        hits.parse_str()
        auth_list, hub_list, name_list = hits.run(n_iter=100)
        print(auth_list)
        print(hub_list)
        return render_template('main.html', mat=mat, auth_list=auth_list, hub_list=hub_list, name_list=name_list,
                               temp=temp)


@app.route('/create-graph-anim', methods=['POST'])
@cross_origin(origin='*')
def create_graph_anim():
    if request.method == 'POST':
        params = [x for x in request.form.values()]
        print(params)
        mat = str(params[0])
        temp = int(params[1])
        print(mat)
        hits = HITS(mat)
        hits.parse_json()
        auth_list, hub_list, name_list = hits.run(n_iter=100)
        print(auth_list)
        print(hub_list)
        return render_template('main.html', mat=mat, auth_list=auth_list, hub_list=hub_list, name_list=name_list,
                               temp=temp)


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
