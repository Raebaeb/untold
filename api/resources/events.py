from logging import log
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from services import story_auth
from story import Story
from timeline import Timeline
from event import Event

event = Blueprint('events', __name__, url_prefix='/api/<int:storyid>/timeline/events')

@event.route('/')
@login_required
@story_auth
def get_events(storyid):
    timeline = Timeline.get(Timeline.story_id == storyid)
    try:
        events = [model_to_dict(event) for event in Event.select().where(Event.timeline_id == timeline)]
        return(jsonify(events)), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@event.route('/<int:eventid>')
@login_required
@story_auth
def read_event(storyid, eventid):
    try:
        event = Event.get_by_id(eventid)
        return jsonify(model_to_dict(event)), 200
    except DoesNotExist:
        return jsonify(error='Event does not exist.'), 404

@event.route('/new', methods=['POST'])
@login_required
@story_auth
def add_event(storyid):
    timeline = Timeline.get(Timeline.story_id == storyid)
    body = request.get_json()
    event = Event.create(**body, timeline_id=timeline)
    return jsonify(model_to_dict(event)), 201

@event.route('/edit/<int:eventid>', methods=['PUT'])
@login_required
@story_auth
def edit_event(storyid, eventid):
    timeline = Timeline.get(Timeline.story_id == storyid)
    try:
        body = request.get_json()
        (Event
            .update(**body)
            .where(Event.id == eventid, Event.timeline_id == timeline)
            .execute())
        event = Event.get_by_id(eventid)
        return jsonify(model_to_dict(event)), 203
    except DoesNotExist:
        return jsonify(error='Event does not exist.'), 404

@event.route('/delete/<int:eventid>', methods=['DELETE'])
@login_required
@story_auth
def delete_event(storyid, eventid):
    timeline = Timeline.get(Timeline.story_id == storyid)
    try:
        (Event
            .delete()
            .where(eventid == Event.id, Event.timeline_id == timeline)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Event not found.'), 404       