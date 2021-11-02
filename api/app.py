from flask import Flask, g
from flask_cors import CORS
from flask_login import LoginManager, login_manager

from db import DATABASE, initialize

from user import User
from story import Story
from character import Character
from scene import Scene
from idea import Idea
from timeline import Timeline
from event import Event
from char_to_idea import CharToIdea
from char_to_scene import CharToScene
from scene_to_idea import SceneToIdea

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

CORS(user, origins=['http://localhost:3000'], supports_credentials=True)
CORS(story, origins=['http://localhost:3000'], supports_credentials=True)
CORS(character, origins=['http://localhost:3000'], supports_credentials=True)
# CORS(scene, origins=['http://localhost:3000'], supports_credentials=True)
# CORS(idea, origins=['http://localhost:3000'], supports_credentials=True)
# CORS(timeline, origins=['http://localhost:3000'], supports_credentials=True)
# CORS(event, origins=['http://localhost:3000'], supports_credentials=True)

app.register_blueprint(user)
app.register_blueprint(story)
app.register_blueprint(character)
# app.register_blueprint(scene)
# app.register_blueprint(idea)
# app.register_blueprint(timeline)
# app.register_blueprint(event)

if __name__ == '__main__': 
    print("app.py is running")
    initialize([User, Story, Character, Scene, Idea, Timeline, Event, CharToScene, CharToIdea, SceneToIdea])
    app.run(debug=DEBUG, port=PORT)  