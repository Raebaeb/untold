from logging import log
from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict
from resources import characters

from event import Event

event = Blueprint('events', __name__, url_prefix='/api/<int:timelineid>/events')

@event.route('/')
@login_required
def get_events(timelineid):
    try:
        events = [model_to_dict(event) for event in Event.select().where(Event.timeline_id == timelineid)]
        return(jsonify(events)), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@event.route('/<int:eventid>')
@login_required
def read_event(eventid):
    try:
        event = Event.get_by_id(eventid)
        return jsonify(model_to_dict(event)), 200
    except DoesNotExist:
        return jsonify(error='Event does not exist.'), 404

@event.route('/new', methods=['POST'])
@login_required
def add_event(timelineid):
    body = request.get_json()
    event = Event.create(**body, timeline_id=timelineid)
    return jsonify(model_to_dict(event)), 201

@event.route('/edit/<int:eventid>', methods=['PUT'])
@login_required
def edit_event(timelineid, eventid):
    try:
        body = request.get_json()
        (Event
            .update(**body)
            .where(Event.id == eventid and Event.timeline_id == timelineid)
            .execute())
        event = Event.get_by_id(eventid)
        return jsonify(model_to_dict(event)), 203
    except DoesNotExist:
        return jsonify(error='Event does not exist.'), 404

@event.route('/delete/<int:eventid>', methods=['DELETE'])
@login_required
def delete_event(timelineid, eventid):
    try:
        (Event
            .delete()
            .where(eventid == Event.id and Event.timeline_id == timelineid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Event not found.'), 404       