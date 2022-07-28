#CWWebDev
import os
from flask import Flask, request, send_file
from flask_cors import CORS
from app.config import configure, DB_NAME
from app.api.api import api
from flask_mail import Mail
from sys import argv

lst = os.listdir('app/build/')

if '.env' not in os.listdir('app/'):
    configure(_db=False)
else:
    if "SECRET_KEY" not in os.environ:
        configure(_db=False)

if DB_NAME not in os.listdir():
    print('detected that database file not in folder, configuring...')
    configure(env=False)

app = Flask(__name__, static_folder='build/static')
CORS(app)
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'dexterlab.website@gmail.com'
app.config['MAIL_PASSWORD'] = os.environ['MAIL_PASSWORD']
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = 'dexterlab.website@gmail.com'
mail = Mail(app)

@app.after_request
def after_req_cors(res):
    local = False
    if len(argv) > 1:
        local = argv[1] == 'local'
    res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000' if local else 'http://intra.sreenath.xyz')
    res.headers.set('Access-Control-Allow-Credentials', 'true')
    return res

@app.route('/<route>')
def router(route):
    for val in lst:
        if route in val:
            break
    return send_file(f'build/{val}')

@app.route('/')
def index():
    with open('app/build/index.html') as f:
        data = f.read()
    return data

app.register_blueprint(api)