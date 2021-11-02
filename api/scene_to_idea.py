from peewee import *
from db import DATABASE

from scene import Scene
from idea import Idea

class SceneToIdea(Model):
    scene_id = ForeignKeyField(Scene, backref='scenetoideas')
    idea_id = ForeignKeyField(Idea, backref='scenetoideas')

    class Meta:
        database = DATABASE