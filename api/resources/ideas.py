from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict
from models.character import Character

from services import story_auth
from models.story import Story
from models.idea import Idea
from models.scene import Scene
from models.char_to_idea import CharToIdea
from models.scene_to_idea import SceneToIdea

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
        get_links = (Idea.select(Idea, CharToIdea.character_id, SceneToIdea.scene_id).join(CharToIdea).where(
            (CharToIdea.idea_id == Idea) | (SceneToIdea.idea_id == Idea)))
        idea_dict = model_to_dict(idea, recurse=False)
        links = {}
        for link in get_links:
            link_dict = model_to_dict(link)
            links['link'] = link_dict
        return jsonify({'ideaInfo': idea_dict, 'links': links}), 200
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
    idea_info = body['ideaInfo']
    add = body['addToIdea']
    idea = Idea.create(**idea_info, story_id=storyid)
    if len(add) != 0:
        for key, val in add.items():
            if key == "character":
                char = Character.get_by_id(val)
                CharToIdea.create(character_id=char, idea_id=idea)
            else:
                scene = Scene.get_by_id(val)
                SceneToIdea.create(scene_id=scene, idea_id=idea)
    return jsonify(model_to_dict(idea, recurse=False)), 201


@idea.route('/edit/<int:ideaid>', methods=['PUT'])
@login_required
@story_auth
def edit_idea(storyid, ideaid):
    body = request.get_json()
    idea_info = body['ideaInfo']
    add = body['addToIdea']
    remove = body['removeFromIdea']
    try:
        if len(idea_info) != 0:
            (Idea
                .update(**idea_info)
                .where((Idea.id == ideaid) & (Idea.story_id == storyid))
                .execute())
        idea = Idea.get_by_id(ideaid)
        if len(remove) != 0:
            for key, val in remove.items():
                if key == "character":
                    query = CharToIdea.delete().where(
                        (CharToIdea.idea_id == ideaid) &
                        (CharToIdea.character_id == val))
                    query.execute()
                elif key == "scene":
                    query = SceneToIdea.delete().where(
                        (SceneToIdea.idea_id == ideaid) &
                        (SceneToIdea.scene_id == val))
                    query.execute()
        if len(add) != 0:
            for key, val in add.items():
                if key == "character":
                    character = Character.get_by_id(val)
                    if not character:
                        CharToIdea.get_or_create(
                            idea_id=ideaid, character_id=character)
                elif key == "scene":
                    scene = SceneToIdea.get_by_id(val)
                    if not scene:
                        SceneToIdea.get_or_create(
                            idea_id=ideaid, scene_id=scene)
        return jsonify(model_to_dict(idea, recurse=False)), 203
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
        (CharToIdea
            .delete()
            .where(CharToIdea.idea_id == ideaid)
            .execute())
        (SceneToIdea
            .delete()
            .where(SceneToIdea.idea_id == ideaid)
            .execute())
        (Idea
            .delete()
            .where(Idea.id == ideaid)
            .execute())
        return jsonify(message=None), 204
    except DoesNotExist:
        return jsonify(error='Idea not found.'), 404
