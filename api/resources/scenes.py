from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from services import story_auth
from models.story import Story
from models.scene import Scene
from models.character import Character
from models.char_to_scene import CharToScene

scene = Blueprint('scenes', __name__, url_prefix='/api/<int:storyid>/scenes')


@scene.route('/')
@login_required
@story_auth
def get_all_scenes(storyid):
    try:
        scenes = [model_to_dict(scene, recurse=False)
                  for scene in Scene.select().where(Scene.story_id == storyid)]
        return jsonify(scenes), 200
    except DoesNotExist:
        return jsonify(error='Error finding resources'), 500


@scene.route('/<int:sceneid>')
@login_required
@story_auth
def get_one_scene(storyid, sceneid):
    story = Story.get_by_id(storyid)
    scene = Scene.get_by_id(sceneid)
    try:
        if (scene.story_id != story):
            raise DoesNotExist
        get_links = (CharToScene.select(CharToScene.character_id)
                    .where(CharToScene.scene_id == sceneid))
        scene_dict = model_to_dict(scene, recurse=False)
        characters = []
        for link in get_links:
            link_dict = model_to_dict(link)
            for key, val in link_dict['character_id'].items():
                if key == 'id':
                    new_dict = {'id': val}
                if key == 'name':
                    new_dict['name'] = val
                    characters.append(new_dict)
        return jsonify({'sceneInfo': scene_dict, 'linkedChars': characters}), 200
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404


@scene.route('/new', methods=['POST'])
@login_required
@story_auth
def create_scene(storyid):
    body = request.get_json()
    scene_info = body['sceneInfo']
    add = body['addToScene']
    scene = Scene.create(**scene_info, story_id=storyid)
    if len(add) != 0:
        for char in add.values():
            character = Character.get_by_id(char)
            CharToScene.create(scene_id=scene, character_id=character)
    scene_dict = model_to_dict(scene, recurse=False)
    return jsonify(scene_dict), 201


@scene.route('/edit/<int:sceneid>', methods=['PUT'])
@login_required
@story_auth
def edit_scene(storyid, sceneid):
    body = request.get_json()
    scene_info = body['sceneInfo']
    add = body['addToScene']
    remove = body['removeFromScene']
    try:
        if len(scene_info) != 0:
            (Scene
                .update(**scene_info)
                .where((Scene.id == sceneid) & (Scene.story_id == storyid))
                .execute())
        scene = Scene.get_by_id(sceneid)
        if len(remove) != 0:
            for char in remove.values():
                query = CharToScene.delete().where(
                    (CharToScene.scene_id == sceneid) &
                    (CharToScene.character_id == char))
                query.execute()
        if len(add) != 0:
            for char in add.values():
                character = Character.get_by_id(char)
                if character:
                    CharToScene.get_or_create(
                        scene_id=scene, character_id=character)
        scene_dict = model_to_dict(scene, recurse=False)
        return jsonify(scene_dict), 203
    except DoesNotExist:
        return jsonify(error='Scene does not exist.'), 404
    except Exception as e:
        print(e)
        return jsonify(error="Error ocurred"), 404


@scene.route('/delete/<int:sceneid>', methods=['DELETE'])
@login_required
@story_auth
def delete_scene(storyid, sceneid):
    try:
        (Scene
            .delete()
            .where(Scene.id == sceneid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Scene not found.'), 404
