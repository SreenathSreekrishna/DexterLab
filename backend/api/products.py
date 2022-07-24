from flask import Blueprint, jsonify, request, send_file
from db import Database
import os
from io import BytesIO

products = Blueprint('products', __name__)

@products.route('/getParts')
def get_parts():
    db = Database(os.environ['DB_NAME'])
    select = ['pID', 'pName', 'pDesc', 'pNumber']
    data = db.select('parts', False, select)
    db.close()
    data = [{k:v for k,v in zip(select, i)} for i in data]
    return jsonify(data)

@products.route('/partImg')
def part_img():
    try:
        _id = int(request.args.get('id'))
    except ValueError:
        return jsonify(status='error', msg='Id is not a number')
    db = Database(os.environ['DB_NAME'])
    try:
        data = db.select('parts', ['pID', _id], ['pImg'])
    except OverflowError:
        db.close()
        return jsonify(status='error', msg='Too big!')
    db.close()
    try:
        [(data,)] = data
    except ValueError:
        return jsonify(status='error', msg='Image not found')
    return send_file(BytesIO(data), mimetype='image/jpeg')