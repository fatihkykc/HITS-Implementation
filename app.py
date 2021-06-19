from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from HITS import HITS

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
        templetter = int(params[1])
        hits = HITS(mat)
        hits.parse_str()
        auth_list, hub_list, name_list = hits.run(n_iter=1)
        print(auth_list)
        print(hub_list)
        print(name_list)
        return render_template('matrix.html', mat=mat, auth_list=auth_list, hub_list=hub_list, name_list=name_list,
                               tempLetter=templetter)


@app.route('/graph', methods=['POST'])
@cross_origin(origin='*')
def create_graph_anim():
    if request.method == 'POST':
        params = [x for x in request.form.values()]
        mat = str(params[0])
        hits = HITS(mat)
        hits.parse_json()
        auth_list, hub_list, name_list = hits.run(n_iter=100)
        print("auth_list: ", auth_list)
        print("hub_list: ", hub_list)
        print("name_list: ", name_list)
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
