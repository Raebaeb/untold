from peewee import *
from db import DATABASE

from character import Character
from scene import Scene

class CharToScene(Model):
    character_id = ForeignKeyField(Character, backref='chartoscenes')
    scene_id = ForeignKeyField(Scene, backref='chartoscenes')

    class Meta:
        database = DATABASE