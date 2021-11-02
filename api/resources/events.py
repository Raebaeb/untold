from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict
from resources import characters

from timeline import Timeline

event = Blueprint('events', __name__, url_prefix='api/<int:timelineid>/events')


