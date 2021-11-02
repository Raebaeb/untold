from flask import Flask, g
from flask_cors import CORS
from flask_login import LoginManager, login_manager

from db import DATABASE, initialize

DEBUG = True
PORT = 8000

login_manager = LoginManager()

app = Flask(__name__)

app.secret_key = '7c9b2323c24243748a25f87c8ed733aa'

login_manager.init_app(app)

@login_manager.user_loader
def load_user(userid):
    try:
        return User.get(User.id == userid)
    except:
        return None

@app.before_request
def before_request():
    g.db = DATABASE
    g.db.connect()

@app.after_request
def after_request(response):
    g.db.close()
    return response

@app.route('/')
def index():
    return 'This is the root route', 200

if __name__ == '__main__':
    print("app.py is running")
    initialize([])
    app.run(debug=DEBUG, port=PORT)