from peewee import *
from db import DATABASE

from models.scene import Scene
from models.idea import Idea

class SceneToIdea(Model):
    scene_id = ForeignKeyField(Scene, backref='scenetoideas')
    idea_id = ForeignKeyField(Idea, backref='scenetoideas')

    class Meta:
        database = DATABASE