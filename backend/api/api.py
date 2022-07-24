from flask import Blueprint
from api.login import login
from api.shopping import shopping
from api.products import products

api = Blueprint('api', __name__, url_prefix='/api')
api.register_blueprint(login)
api.register_blueprint(shopping)
api.register_blueprint(products)