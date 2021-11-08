from flask import Flask, g
from flask_cors import CORS
from flask_login import LoginManager, login_manager
import os

from db import DATABASE, initialize

from models.user import User
from models.story import Story
from models.character import Character
from models.scene import Scene
from models.idea import Idea
from models.timeline import Timeline
from models.event import Event
from models.char_to_scene import CharToScene

from resources.users import user
from resources.stories import story
from resources.characters import character
from resources.scenes import scene
from resources.ideas import idea
from resources.timelines import timeline
from resources.events import event


DEBUG = True
PORT = 8000


login_manager = LoginManager()


app = Flask(__name__)


app.secret_key = os.environ.get('SECRET') or '7c9b2323c24243748a25f87c8ed733aa'


login_manager.init_app(app)


@login_manager.user_loader
def load_user(user):
    try:
        return User.get(User.id == user)
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
    return 'This is the root route'


origins=['http://localhost:3000']


app.register_blueprint(user)
app.register_blueprint(story)
app.register_blueprint(character)
app.register_blueprint(scene)
app.register_blueprint(idea)
app.register_blueprint(timeline)
app.register_blueprint(event)


if 'DATABASE_URL' in os.environ:
    initialize([User, Story, Character, Scene, Idea, Timeline, Event, CharToScene])
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['SESSION_COOKIE_HTTPONLY'] = False
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    origins.append(os.environ.get('CLIENT_URL'))

CORS(app, origins=origins, supports_credentials=True)

if __name__ == '__main__': 
    initialize([User, Story, Character, Scene, Idea, Timeline, Event, CharToScene])
    app.run(debug=DEBUG, port=PORT)
