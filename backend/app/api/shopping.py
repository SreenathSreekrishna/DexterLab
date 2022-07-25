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

@shopping.route('/purchase', methods=['POST'])
def purchase():
    return jsonify(status="TODO")