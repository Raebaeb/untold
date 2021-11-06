from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from services import story_auth
from models.story import Story
from models.idea import Idea

idea = Blueprint('ideas', __name__, url_prefix='/api/<int:storyid>/ideas')


@idea.route('/')
@login_required
@story_auth
def get_all_ideas(storyid):
    try:
        ideas = [model_to_dict(idea, recurse=False) for idea in Idea.select().where(
            Idea.story_id == storyid)]
        return jsonify(ideas), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500


@idea.route('/<int:ideaid>')
@login_required
@story_auth
def get_one_idea(storyid, ideaid):
    idea = Idea.get_by_id(ideaid)
    story = Story.get_by_id(storyid)
    try:
        if (idea.story_id != story):
            raise DoesNotExist
        idea_dict = model_to_dict(idea, recurse=False)
        return jsonify(idea_dict), 200
    except DoesNotExist:
        return jsonify(error='Idea does not exist.'), 404
    except Exception as e:
        print(e)
        return jsonify(error="Error ocurred"), 404


@idea.route('/new', methods=['POST'])
@login_required
@story_auth
def create_idea(storyid):
    body = request.get_json()
    idea = Idea.create(**body, story_id=storyid)
    return jsonify(model_to_dict(idea, recurse=False)), 201


@idea.route('/edit/<int:ideaid>', methods=['PUT'])
@login_required
@story_auth
def edit_idea(storyid, ideaid):
    body = request.get_json()
    try:
        (Idea
            .update(**body)
            .where((Idea.id == ideaid) & (Idea.story_id == storyid))
            .execute())
        idea = Idea.get_by_id(ideaid)
        idea_dict = model_to_dict(idea, recurse=False)
        return jsonify(idea_dict), 203
    except DoesNotExist:
        return jsonify(error='Idea does not exist.'), 404
    except Exception as e:
        print(e)
        return jsonify(error="Error ocurred"), 404


@idea.route('/delete/<int:ideaid>', methods=['DELETE'])
@login_required
@story_auth
def delete_idea(storyid, ideaid):
    try:
        (Idea
            .delete()
            .where(Idea.id == ideaid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Idea not found.'), 404
