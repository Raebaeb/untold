from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from story import Story

story = Blueprint('stories', __name__, url_prefix='api/stories')


@story.route('/')
@login_required
def get_all_stories():
    try:
        stories = [model_to_dict(story) for story in Story.select().where(
            Story.user_id == current_user.id)]
        return jsonify(stories), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@story.route('/<int:storyid>')
@login_required
def get_one_story(storyid):
    try:
        story = Story.get_by_id(storyid)
        if (story.user_id != current_user.id):
            return jsonify(message='Unauthorized'), 401
        return jsonify(model_to_dict(story)), 200
    except DoesNotExist:
        return jsonify(error='Story does not exist.'), 404


@story.route('/new', methods=['POST'])
@login_required
def new_story():
    body = request.get_json()
    story = Story.create(**body, user_id=current_user.id)
    return jsonify(model_to_dict(story)), 201


@story.route('/edit/<int:storyid>', methods=['PUT'])
@login_required
def edit_story(storyid):
    try:
        body = request.get_json()
        if (Story.user_id != current_user.id):
            return jsonify(message='Unauthorized'), 401
        (Story
            .update(**body)
            .where(Story.id == storyid)
            .execute())
        story = Story.get_by_id(storyid)
        return jsonify(model_to_dict(story)), 203
    except DoesNotExist:
        return jsonify(error='Story not found.'), 404


@story.route('/delete/<int:storyid>', methods=['DELETE'])
@login_required
def delete_story(storyid):
    if (Story.user_id != current_user.id):
        return jsonify(message='Unauthorized'), 401
    try:
        (Story
            .delete()
            .where(Story.id == storyid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Story not found.'), 404
