from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from timeline import Timeline

timeline = Blueprint('timelines', __name__, url_prefix='/api/<int:storyid>/timeline')

@timeline.route('/')
@login_required
def get_timeline(storyid):
    try:
        timeline = Timeline.select().where(Timeline.story_id == storyid)
        return jsonify(timeline), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500
