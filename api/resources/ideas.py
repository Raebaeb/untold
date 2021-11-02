from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from idea import Idea
from char_to_idea import CharToIdea
from scene_to_idea import SceneToIdea

idea = Blueprint('ideas', __name__, url_prefix='/api/<int:storyid>/ideas')

@idea.route('/')
@login_required
def get_all_ideas(storyid):
    try:
        ideas = [model_to_dict(idea) for idea in Idea.select().where(Idea.story_id == storyid)]
        return jsonify(ideas), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@idea.route('/<int:ideaid>')
@login_required
def get_one_idea(storyid, ideaid):
    try:
        idea = Idea.get_by_id(ideaid)
        if (idea.story_id != storyid):
            return jsonify(error='Idea does not exist.'), 404
        return jsonify(model_to_dict(idea)), 200
    except DoesNotExist:
        return jsonify(error='Idea does not exist.'), 404

@idea.route('/newidea', methods=['POST'])
@login_required
def create_idea(storyid):
    body = request.get_json()
    idea_info = body['ideaInfo']
    idea = Idea.create(**idea_info, story_id=storyid)
    return jsonify(model_to_dict(idea)), 201

@idea.route('/edit/<int:ideaid>', methods=['PUT'])
@login_required
def edit_idea(storyid, ideaid):
    try:
        body = request.get_json()
        idea_info = body['ideaInfo']
        (Idea
            .update(**idea_info)
            .where(Idea.id == ideaid and Idea.story_id == storyid)
            .execute())
        idea = Idea.get_by_id(ideaid)
        return jsonify(model_to_dict(idea)), 203
    except DoesNotExist:
        return jsonify(error='Idea does not exist.'), 404

@idea.route('/delete/<int:ideaid>', methods=['DELETE'])
@login_required
def delete_idea(ideaid):
    try:
        (Idea
            .delete()
            .where(Idea.id == ideaid)
            .execute())
        (CharToIdea
            .delete()
            .where(CharToIdea.idea_id == ideaid)
            .execute())
        (SceneToIdea
            .delete()
            .where(SceneToIdea.idea_id == ideaid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Idea not found.'), 404