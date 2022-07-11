#login routes
from hashlib import sha512
import os
import sqlite3
from flask import Blueprint, current_app, jsonify, make_response, request
from db import Database
from flask_mail import Message, Mail

login = Blueprint('login', __name__)

def send(msg):
    with current_app.app_context():
        mail = Mail()
        mail.send(msg)

@login.route('/register', methods=['POST'])
def register():
    name, mail, pwd = request.form.get('uName'), request.form.get('uMail'), request.form.get('uPwd')
    if not name:
        return jsonify(status='error',msg='No name!')
    if not mail:
        return jsonify(status='error',msg='No email!')
    if not pwd:
        return jsonify(status='error',msg='No password!')
    
    if any(i in name for i in '!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?`~'):
        return jsonify(status='error',msg='Invalid name!')
    if any(i in mail for i in '!#$%^&*()=+[{]}\\|;:\'",<>/?`~'):
        return jsonify(status='error',msg='Invalid email!')
    if any(i in pwd for i in '\\"\'[{]};'):
        return jsonify(status='error',msg='Invalid password!')
    
    db = Database(os.environ['DB_NAME'])
    if len(db.select('users', ['uMail', mail])) != 0:
        db.close()
        return jsonify(status='error',msg='Email taken!')
    
    pwd = sha512(pwd.encode()).digest()
    if len(db.select('users', ['uPwd', pwd])) != 0:
        db.close()
        return jsonify(status='error',msg='Password too common!')
    
    try:
        db.insert('users', [name, mail, pwd, 0, 0])
    except sqlite3.Error:
        db.close()
        return jsonify(status='error', msg='db error')
    db.close()
    encoded = int.from_bytes(pwd, 'big') ^ int(os.environ['SECRET_KEY'], 16)
    code = hex(encoded)[2:].zfill(128)

    mesg = Message(
        'Verification for DexterLabs',
        recipients=[mail]
    )
    mesg.html = f'''
    <h1>
      Click <a href="{os.environ["DEPLOY_URL"]}/verify?code={code}">here</a> to verify your account
    </h1>
    <b>Didn't register? DO NOT CLICK THE LINK ABOVE</b>
    '''
    send(mesg)
    return jsonify(status='sent')

@login.route('/verify/<code>')
def verify(code):
    if len(code) != 128:
        return jsonify(status='error', msg='invalid length')
    try:
        pwd = bytes.fromhex(hex(int(code, 16) ^ int(os.environ['SECRET_KEY'], 16))[2:].zfill(128))
    except ValueError:
        return jsonify(status='error', msg='code invalid')

    db = Database(os.environ['DB_NAME'])
    if len(db.select('users', constraints=['uPwd', pwd])) == 0:
        db.close()
        return jsonify(status='error',msg='code invalid')

    try:
        db.update('users', ['uVerified'], [1], constraints=['uPwd', pwd])
    except sqlite3.Error as e:
        print(e)
        return jsonify(status='error',msg='db error')
    db.close()
    return jsonify(status='updated')

@login.route('/login', methods=['POST'])
def _login():
    db = Database(os.environ['DB_NAME'])
    mail, pwd = request.form.get('uMail'), request.form.get('uPwd')
    if not pwd:
        enc = request.cookies.get('session')
        if not enc:
            return jsonify(status='error', msg='No password')
        enc = enc.zfill(128)
        pwd = bytes.fromhex(hex(int(enc,16)^int(os.environ['SECRET_KEY'], 16))[2:].zfill(128))
        mail = db.select('users', ['uPwd', pwd], ['uMail'])
        if len(mail)!=1:
            return jsonify(status='error', msg='db error')
        if len(mail[0])!=1:
            return jsonify(status='error', msg='db error')
        mail = mail[0][0]
    else:
        if not mail:
            return jsonify(status='error', msg='No email!')
        pwd = sha512(pwd.encode()).digest()
    db_pwd = db.select('users', constraints=['uMail', mail], columns=['uPwd'])
    if len(db_pwd) == 0:
        db.close()
        return jsonify(status='error', msg='Mail invalid!')
    if len(db_pwd[0]) != 1:
        db.close()
        return jsonify(status='error', msg='db error')
    if db_pwd[0][0] != pwd:
        db.close()
        return jsonify(status='error', msg='Incorrect password!')
    user = db.select('users', constraints=['uMail', mail], columns=['uMail', 'uName', 'uBalance'])
    db.close()
    if len(user) != 1:
        return jsonify(status='error', msg='db error')
    user = user[0]
    enc = int.from_bytes(pwd, 'big') ^ int(os.environ['SECRET_KEY'], 16)
    resp = make_response(jsonify(user))
    resp.set_cookie('session', hex(enc)[2:])
    return resp