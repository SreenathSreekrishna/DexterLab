from flask import Blueprint, jsonify, request, send_file
from db import Database
import os
from io import BytesIO

products = Blueprint('products', __name__)
r = int(os.environ['PROFIT'])/100+1
select = ['pID', 'pName', 'pDesc', 'pNumber', 'pCost', 'pLabour']

def dict_from_db_data(dat, select):
    data = {k:v for k,v in zip(select[:-2], dat[:-2])}
    data['pCost'] = round(sum(dat[-2:-1])*r,3)
    return data

def get_invention_cost(val):
    db = Database(os.environ['DB_NAME'])
    val = [str(i) for i in val]
    costs = db.execute(f'SELECT pLabour,pCost FROM parts WHERE pID IN ({",".join(val)})')
    db.close()
    costs = [sum(i)*r for i in costs]
    return sum(costs)

@products.route('/getParts')
def get_parts():
    db = Database(os.environ['DB_NAME'])
    data = db.select('parts', False, select)
    db.close()
    data = [dict_from_db_data(i, select) for i in data]
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

@products.route('/getPart')
def get_part():
    try:
        _id = int(request.args.get('id'))
    except ValueError:
        return jsonify(status='error', msg='Id is not a number')
    db = Database(os.environ['DB_NAME'])
    try:
        part = db.select('parts', ['pID', _id], select)
    except OverflowError:
        db.close()
        return jsonify(status='error', msg='Too big!')
    
    try:
        [part,] = part
    except ValueError:
        return jsonify(status='error', msg='Not found')
    
    return jsonify(dict_from_db_data(part, select))


@products.route('/getInventions')
def get_inventions():
    db = Database(os.environ['DB_NAME'])
    select = ['iID', 'iName', 'iDesc', 'iCreator', 'iParts']
    dat = db.select('inventions', False, select)
    extra = db.select('inventions', False, ['iExtraCost'])
    db.close()
    data = [{k:v for k,v in zip(select[:-1], i)} for i in dat]
    for idx,v in enumerate(data):
        val = hex(int.from_bytes(dat[idx][-1], 'big'))[2:]
        if len(val) % 4 != 0:
            val = '0'*(4-(len(val)%4))+val
        val = [int(val[i:i+4],16) for i in range(0, len(val), 4)]
        v['iParts'] = val
        v['iCost'] = round(get_invention_cost(val)+extra[idx][0], 3)
    return jsonify(data)

@products.route('/inventionImg')
def invention_img():
    try:
        _id = int(request.args.get('id'))
    except ValueError:
        return jsonify(status='error', msg='Id is not a number')
    db = Database(os.environ['DB_NAME'])
    try:
        data = db.select('inventions', ['iID', _id], ['iImg'])
    except OverflowError:
        db.close()
        return jsonify(status='error', msg='Too big!')
    db.close()
    try:
        [(data,)] = data
    except ValueError:
        return jsonify(status='error', msg='Image not found')
    return send_file(BytesIO(data), mimetype='image/jpeg')