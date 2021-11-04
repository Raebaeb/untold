from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from services import story_auth
from models.timeline import Timeline

timeline = Blueprint('timelines', __name__, url_prefix='/api/<int:storyid>/timeline')

@timeline.route('/')
@login_required
@story_auth
def get_timeline(storyid):
    try:
        timeline = Timeline.get(Timeline.story_id == storyid)
        return jsonify(model_to_dict(timeline)), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500
