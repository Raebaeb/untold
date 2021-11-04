from peewee import *
from base import BaseModel

from story import Story

class Character(BaseModel):
    name = CharField()
    age = CharField()
    occupation = CharField()
    abilities = TextField(null=True)
    appearance = TextField()
    goals = TextField(null=True)
    story_id = ForeignKeyField(Story, backref='characters')