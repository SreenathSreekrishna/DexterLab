import os
from flask import Flask
from config import configure, DB_NAME
from api.api import api

if DB_NAME not in os.listdir():
    print('detected that database file not in folder, configuring...')
    configure()

app = Flask(__name__)
app.register_blueprint(api)

if __name__ == "__main__":
    app.run()