from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from services import story_auth
from models.story import Story
from models.timeline import Timeline

story = Blueprint('stories', __name__, url_prefix='/api/stories')


@story.route('/')
@login_required
def get_all_stories():
    try:
        stories = [model_to_dict(story) for story in Story.select().where(
            Story.user == current_user)]
        for dict in stories:
            del dict['user']
        return jsonify(stories), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@story.route('/<int:storyid>')
@login_required
@story_auth
def get_one_story(storyid):
    try:
        story = Story.get_by_id(storyid)
        story_dict =  model_to_dict(story)
        del story_dict['user']
        return jsonify(story_dict), 200
    except DoesNotExist:
        return jsonify(error='Story does not exist.'), 404


@story.route('/new', methods=['POST'])
@login_required
def new_story():
    body = request.get_json()
    story = Story.create(**body, user=current_user.id)
    Timeline.create(story_id=story)
    story_dict =  model_to_dict(story, recurse=False)
    return jsonify(story_dict), 201


@story.route('/edit/<int:storyid>', methods=['PUT'])
@login_required
@story_auth
def edit_story(storyid):
    try:
        body = request.get_json()
        (Story
            .update(**body)
            .where(Story.id == storyid)
            .execute())
        story = Story.get_by_id(storyid)
        story_dict =  model_to_dict(story)
        del story_dict['user']
        return jsonify(story_dict), 203
    except DoesNotExist:
        return jsonify(error='Story not found.'), 404


@story.route('/delete/<int:storyid>', methods=['DELETE'])
@login_required
@story_auth
def delete_story(storyid):
    story = Story.get_by_id(storyid)
    try:
        (Timeline
            .delete()
            .where(Timeline.story_id == story)
            .execute())
        (Story
            .delete()
            .where(Story.id == storyid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Story not found.'), 404
