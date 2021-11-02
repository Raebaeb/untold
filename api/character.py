from peewee import *
from base import BaseModel

from story import Story

class Character(BaseModel):
    name = CharField()
    age = IntegerField()
    occupation = CharField()
    abilities = TextField()
    appearance = TextField()
    goals = TextField()
    story_id = ForeignKeyField(Story, backref='characters')