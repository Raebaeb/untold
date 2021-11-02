from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from scene import Scene
from character import Character
from char_to_scene import CharToScene

scene = Blueprint('scenes', __name__, url_prefix='/api/<int:storyid>/scenes')

@scene.route('/')
@login_required
def get_all_scenes(storyid):
    try:
        scenes = [model_to_dict(scene) for scene in Scene.select().where(Scene.story_id == storyid)]
        return jsonify(scenes), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@scene.route('/<int:sceneid>')
@login_required
def get_one_scene(storyid, sceneid):
    try:
        scene = Scene.get_by_id(sceneid)
        if (scene.story_id != storyid):
            return jsonify(error='Scene does not exist.'), 404
        return jsonify(model_to_dict(scene)), 200
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404

@scene.route('/newscene', methods=['POST'])
@login_required
def create_scene(storyid, characters):
    body = request.get_json()
    scene = Scene.create(**body, story_id=storyid)
    [CharToScene.create(character_id=char.id, scene_id=scene.id) for char in characters]
    return jsonify(model_to_dict(scene)), 201

@scene.route('/edit/<int:sceneid>', methods=['PUT'])
@login_required
def edit_scene(storyid, sceneid):
    try:
        body = request.get_json()
        (Scene
            .update(**body)
            .where(Scene.id == sceneid and Scene.story_id == storyid)
            .execute())
        scene = Scene.get_by_id(sceneid)
        return jsonify(model_to_dict(scene)), 203
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404

@scene.route('/delete/<int:sceneid>', methods=['DELETE'])
@login_required
def delete_scene(sceneid):
    try:
        (Scene
            .delete()
            .where(Scene.id == sceneid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Scene not found.'), 404