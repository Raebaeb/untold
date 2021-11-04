from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from services import story_auth
from models.story import Story
from models.character import Character

character = Blueprint('characters', __name__, url_prefix='/api/<int:storyid>/characters')

@character.route('/')
@login_required
@story_auth
def get_all_chars(storyid):
    try:
        characters = [model_to_dict(character) for character in Character.select(
        ).where(Character.story_id == storyid)]
        return jsonify(characters), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@character.route('/<int:charid>')
@login_required
@story_auth
def get_one_char(storyid, charid):
    try:
        character = Character.get_by_id(charid)
        return jsonify(model_to_dict(character)), 200
    except DoesNotExist:
        return jsonify(error='Character does not exist.'), 404

@character.route('/new', methods=['POST'])
@login_required
@story_auth
def create_char(storyid):
    body = request.get_json()
    character = Character.create(**body, story_id=storyid)
    return jsonify(model_to_dict(character)), 201

@character.route('/edit/<int:charid>', methods=['PUT'])
@login_required
@story_auth
def edit_char(storyid, charid):
    try:
        body = request.get_json()
        (Character
            .update(**body)
            .where(Character.id == charid and Character.story_id == storyid)
            .execute())
        character = Character.get_by_id(charid)
        return jsonify(model_to_dict(character)), 203
    except DoesNotExist:
        return jsonify(error='Character does not exist.'), 404

@character.route('/delete/<int:charid>', methods=['DELETE'])
@login_required
@story_auth
def delete_char(storyid, charid):
    try:
        (Character
            .delete()
            .where(Character.id == charid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Character not found.'), 404