from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict
from resources import characters

from timeline import Timeline
from event import Event

event = Blueprint('events', __name__, url_prefix='api/<int:timelineid>/events')

@event.route('/')
@login_required
def get_events(timelineid):
    try:
        events = [model_to_dict(event) for event in Event.select().where(Event.timeline_id == timelineid)]
        return(jsonify(events)), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500