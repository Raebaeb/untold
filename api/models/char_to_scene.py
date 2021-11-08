from peewee import *
from db import DATABASE

from models.character import Character
from models.scene import Scene

class CharToScene(Model):
    character_id = ForeignKeyField(Character, backref='chartoscenes', on_delete='CASCADE')
    scene_id = ForeignKeyField(Scene, backref='chartoscenes', on_delete='CASCADE')

    class Meta:
        database = DATABASE