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
        auth_list, hub_list, name_list = HITS(mat).run(n_iter=100)
        print(auth_list)
        print(hub_list)
        return render_template('main.html', mat=mat, auth_list=auth_list, hub_list=hub_list, name_list=name_list, temp=temp)

    #if request.method == 'POST':
    #    mat = str(request.data)[2:]
    #    auth_list, hub_list = HITS(mat).run(n_iter=100)
    #    print("mat: ", mat)
    #    print("auth_list: ", auth_list)
    #    print("hub_list: ", hub_list)
    #    return render_template('main.html', mat=mat, auth_list=auth_list, hub_list=hub_list)


# @app.route('/predict', methods=['POST'])
# def predict():
#     params = [x for x in request.form.values()]
#     startDate = params[0]
#     endDate = params[1]
#     days = params[2]
#     arc = params[3]
#     print(startDate, endDate, days, arc)
#     if arc == "DEF":
#         predictions, plotpath, truth = LGBRegression.start(startDate, endDate, days, plot=True)
#     elif arc == "BIN1":
#         predictions, truth, plotpath, predictions_clf = RunIterNUL.run_binary_1_iter(startDate, endDate, days)
#     elif arc == "NUL1":
#         predictions, truth, plotpath, predictions_clf = RunIterNUL.run_nul_1_iter(startDate, endDate, days)
#     elif arc == "NUL3":
#         predictions, truth, plotpath, predictions_clf = RunIterNUL.run_nul_3_iter(startDate, endDate, days)
#         predictions = np.array(predictions["preds"].to_list())
#     elif arc == "DMDNUL1":
#         predictions, truth, plotpath, predictions_clf = RunIterNUL.run_dimdik(startDate, endDate, days)
#
#     # mean_absolute_percentage_error(truth, predictions)
#     return render_template('index.html', path=plotpath, mae=mean_absolute_error(truth, predictions),
#                            mape=mean_absolute_percentage_error(truth, predictions),
#                            rmse=mean_squared_error(truth, predictions, squared=False), smape=smape(truth,
#                                                                                                    predictions))


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
