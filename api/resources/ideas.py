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

@idea.route('/<int:ideaid>')
@login_required
def get_one_idea(storyid, sceneid):

@idea.route('/newidea', methods=['POST'])
@login_required
def create_idea(storyid):

@idea.route('/edit/<int:ideaid>', methods=['PUT'])
@login_required
def edit_idea(storyid, sceneid):

@idea.route('/delete/<int:ideaid>', methods=['DELETE'])
@login_required
def delete_idea(sceneid):