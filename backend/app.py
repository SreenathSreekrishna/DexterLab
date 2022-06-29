import os
from flask import Flask
from config import configure, DB_NAME
from api.api import api
from flask_mail import Mail

if '.env' not in os.listdir():
    configure(_db=False)
else:
    if "SECRET_KEY" not in os.environ:
        configure(_db=False)

if DB_NAME not in os.listdir():
    print('detected that database file not in folder, configuring...')
    configure(env=False)

app = Flask(__name__)
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'dexterlab.website@gmail.com'
app.config['MAIL_PASSWORD'] = os.environ['MAIL_PASSWORD']
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = 'dexterlab.website@gmail.com'
mail = Mail(app)

app.register_blueprint(api)

if __name__ == "__main__":
    app.run()