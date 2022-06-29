from flask import Blueprint
from api.login import login

api = Blueprint('api', __name__, url_prefix='/api')
api.register_blueprint(login)