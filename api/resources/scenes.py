from flask import Blueprint, jsonify, request
from flask_login import login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from story import Story
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
        story = Story.get_by_id(storyid)
        scene = Scene.get_by_id(sceneid)
        if (scene.story_id != story):
            return jsonify(error='Scene does not exist.'), 404
        return jsonify(model_to_dict(scene)), 200
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404

@scene.route('/new', methods=['POST'])
@login_required
def create_scene(storyid):
    story = Story.get_by_id(storyid)
    body = request.get_json()
    scene_info = body['sceneInfo']
    add = body['addToScene']
    scene = Scene.create(**scene_info, story_id=story)
    if (add != None):
        linked_chars = []
        for char in add.values():
            character = Character.get_by_id(char)
            create_link = CharToScene.create(scene_id=scene.id, character_id=character)
            linked_chars.append(model_to_dict(create_link))
    return jsonify(model_to_dict(scene), linked_chars), 201

@scene.route('/edit/<int:sceneid>', methods=['PUT'])
@login_required
def edit_scene(storyid, sceneid):
    try:
        body = request.get_json()
        scene_info = body['sceneInfo']
        add = body['addToScene']
        remove = body['removeFromScene']
        (Scene
            .update(**scene_info)
            .where(Scene.id == sceneid and Scene.story_id == storyid)
            .execute())
        scene = Scene.get_by_id(sceneid)
        if (remove != None):
            for char in remove.values():
                CharToScene.delete().where(CharToScene.scene_id == scene and CharToScene.character_id == char)
        linked_chars = [model_to_dict(char) for char in CharToScene.select().where(CharToScene.scene_id == scene)]
        if (add != None):
            for char in add.values():
                character = Character.get_by_id(char)
                create_link = CharToScene.create(scene_id=scene.id, character_id=character)
                linked_chars.append(model_to_dict(create_link))
        return jsonify(model_to_dict(scene)), 203
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404

@scene.route('/delete/<int:sceneid>', methods=['DELETE'])
@login_required
def delete_scene(storyid, sceneid):
    try:
        scene = Scene.get_by_id(sceneid)
        (CharToScene
            .delete()
            .where(CharToScene.scene_id == scene)
            .execute())
        (Scene
            .delete()
            .where(Scene.id == sceneid and Scene.story_id == storyid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Scene not found.'), 404