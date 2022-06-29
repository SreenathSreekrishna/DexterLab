#login routes
import os
from flask import Blueprint, current_app, jsonify, request
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
    
    if any(i in name for i in '!@#$%^&*()-_=+[{]}\|;:\'",<.>/?`~'):
        return jsonify(status='error',msg='Invalid name!')
    if any(i in mail for i in '!#$%^&*()=+[{]}\|;:\'",<>/?`~'):
        return jsonify(status='error',msg='Invalid email!')
    if any(i in pwd for i in '"\'[{]};'):
        return jsonify(status='error',msg='Invalid password!')
    
    db = Database(os.environ['DB_NAME'])
    db.insert('users', [name, mail, pwd, 0])
    db.close()
    code = "TODO"

    mesg = Message(
        'Verification for DexterLabs',
        recipients=[mail]
    )
    mesg.html = f'<h1>Click <a href="{os.environ["DEPLOY_URL"]}/verify/{code}">here</a> to verify your account</h1>'
    send(mesg)
    return jsonify(status='sent')