from peewee import *
from models.base import BaseModel
from models.story import Story

class Character(BaseModel):
    name = CharField()
    age = CharField()
    occupation = CharField()
    abilities = TextField(null=True)
    appearance = TextField()
    goals = TextField(null=True)
    story_id = ForeignKeyField(Story, backref='characters')