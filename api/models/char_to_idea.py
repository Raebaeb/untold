from peewee import *
from db import DATABASE

from models.character import Character
from models.idea import Idea

class CharToIdea(Model):
    character_id = ForeignKeyField(Character, backref='chartoideas')
    idea_id = ForeignKeyField(Idea, backref='chartoideas')

    class Meta:
        database = DATABASE