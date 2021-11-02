from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

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
        return jsonify(error='Character does not exist.'), 404

@character.route('/newchar', methods=['POST'])
@login_required
def create_char(storyid):
    body = request.get_json()
    character = Character.create(**body, story_id=storyid)
    return jsonify(model_to_dict(character)), 201

@character.route('/edit/<int:charid>', methods=['PUT'])
@login_required
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
def delete_char(charid):
    try:
        (Character
            .delete()
            .where(Character.id == charid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Character not found.'), 404