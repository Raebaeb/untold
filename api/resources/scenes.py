from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from services import story_auth
from story import Story
from scene import Scene
from character import Character
from char_to_scene import CharToScene

scene = Blueprint('scenes', __name__, url_prefix='/api/<int:storyid>/scenes')

@scene.route('/')
@login_required
@story_auth
def get_all_scenes(storyid):
    try:
        scenes = []
        for scene in Scene.select().where(Scene.story_id == storyid):
            scene_dict = model_to_dict(scene)
            del scene_dict['story_id'], scene_dict['summary'], scene_dict['notes']
            scenes.append(scene_dict)
        return jsonify(scenes), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500

@scene.route('/<int:sceneid>')
@login_required
@story_auth
def get_one_scene(storyid, sceneid):
    try:
        story = Story.get_by_id(storyid)
        scene = Scene.get_by_id(sceneid)
        if (scene.story_id != story):
            return jsonify(error='Scene does not exist.'), 404
        get_links = (CharToScene.select(CharToScene.character_id)
        .where(CharToScene.scene_id == scene))
        scene_dict = model_to_dict(scene)
        del scene_dict['story_id']
        scene_dict['linked_chars'] = []
        for link in get_links:
            link_dict = model_to_dict(link)
            for key, val in link_dict['character_id'].items():
                if key == 'name':
                    scene_dict['linked_chars'].append({'name':f'{val}'})
        return jsonify(scene_dict), 200
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404

@scene.route('/new', methods=['POST'])
@login_required
@story_auth
def create_scene(storyid):
    story = Story.get_by_id(storyid)
    body = request.get_json()
    scene_info = body['sceneInfo']
    add = body['addToScene']
    scene = Scene.create(**scene_info, story_id=story)
    if (add != None):
        for char in add.values():
            character = Character.get_by_id(char)
            CharToScene.create(scene_id=scene, character_id=character)
    scene_dict = model_to_dict(scene)
    del scene_dict['story_id']
    return jsonify(scene_dict), 201

@scene.route('/edit/<int:sceneid>', methods=['PUT'])
@login_required
@story_auth
def edit_scene(storyid, sceneid):
    # story = Story.get_by_id(storyid)
    try:
        body = request.get_json()
        scene_info = body['sceneInfo']
        add = body['addToScene']
        remove = body['removeFromScene']
        (Scene
            .update(**scene_info)
            .where(Scene.id == sceneid)
            .execute())
        scene = Scene.get_by_id(sceneid)
        if (remove != None):
            for char in remove.values():
                # character = Character.get_by_id(char)
                CharToScene.delete().where((CharToScene.scene_id == sceneid) & (CharToScene.character_id == char)).execute()
        if (add != None):
            for char in add.values():
                character = Character.get_by_id(char)
                if character:
                    CharToScene.get_or_create(scene_id=scene, character_id=character)
        scene_dict = model_to_dict(scene)
        del scene_dict['story_id']
        return jsonify(scene_dict), 203
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404

@scene.route('/delete/<int:sceneid>', methods=['DELETE'])
@login_required
@story_auth
def delete_scene(storyid, sceneid):
    try:
        scene = Scene.get_by_id(sceneid)
        (CharToScene
            .delete()
            .where(CharToScene.scene_id == scene)
            .execute())
        (Scene
            .delete()
            .where(Scene.id == sceneid, Scene.story_id == storyid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Scene not found.'), 404


