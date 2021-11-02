from logging import log
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from story import Story
from character import Character

character = Blueprint('characters', __name__, url_prefix='/api/characters/<int:storyid>')

@character.route('/')
@login_required
def get_all_chars(storyid):
    try:
        characters = [model_to_dict(character) for character in Character.select().where(Character.story_id == storyid)]
        return jsonify(characters), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@character.route('/<int:charid>')
@login_required
def get_one_char(storyid, charid):
    try:
        character = Character.get_by_id(charid)
        if (character.story_id != storyid):
            return jsonify(error='Character does not exist.'), 404
        return jsonify(model_to_dict(character)), 200
    except DoesNotExist:
        return jsonify(error='Character does not exist'), 404