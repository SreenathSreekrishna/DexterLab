#0 for part, 1 for invention
import sqlite3
from flask import Blueprint, request, jsonify
from app.db import Database
import os

shopping = Blueprint('shopping', __name__)

@shopping.route('/addCash', methods=['POST'])
def add_cash():
    amount = request.form.get('amount')
    if not amount:
        return jsonify(status='error', msg='No amount specified!')
    try:
        amount = float(amount)
    except ValueError:
        return jsonify(status='error', msg='Amount is not a valid number!')
    
    enc = request.cookies.get('session')
    if not enc:
        return jsonify(status='error', msg='No cookie!')
    try:
        enc = int(enc, 16)
    except ValueError:
        return jsonify(status='error', msg='Invalid cookie')
    pwd = bytes.fromhex(hex(enc^int(os.environ['SECRET_KEY'], 16))[2:].zfill(128))
    db = Database(os.environ['DB_NAME'])
    db.execute(
        'UPDATE users SET uBalance=(SELECT uBalance FROM users WHERE uPwd=?)+? WHERE uPwd=?', 
        (pwd,amount, pwd)
    )
    db.close()
    return jsonify(status='done')

@shopping.route('/addToCart', methods=['POST'])
def add_part_to_cart():
    cookie = request.cookies.get('session')
    if not cookie:
        return jsonify(status='error', msg='No cookie!')
    _type = request.form.get('type')
    if not _type:
        return jsonify(status='error', msg='Did not specify type of item')
    if _type not in ['pID', 'iID']:
        return jsonify(status='error', msg='Invalid ype of item')
    _id = request.form.get('id')
    if not _id:
        return jsonify(status='error', msg='No id!')
    try:
        cookie = bytes.fromhex(hex(int(cookie, 16)^int(os.environ['SECRET_KEY'], 16))[2:].zfill(128))
    except ValueError:
        return jsonify(status='error', msg='Invalid cookie')
    db = Database(os.environ['DB_NAME'])

    pExists = db.select('parts' if _type=='pID' else 'inventions', [_type, _id])
    if len(pExists) != 1:
        db.close()
        return jsonify(status='error', msg=' doesn\'t exist!')

    u = db.select('users', ['uPwd', cookie])
    try:
        uID = u[0][0]
    except IndexError:
        db.close()
        return jsonify(status='error', msg='User not found!')
    
    try:
        db.insert('carts', [uID, _id, 0 if _type=='pID' else 1])
    except sqlite3.Error:
        return jsonify(status='error', msg='db error')
    
    return jsonify(status='done')