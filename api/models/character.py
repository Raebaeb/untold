from peewee import *
from models.base import BaseModel
from models.story import Story

class Character(BaseModel):
    name = CharField()
    age = CharField(null=True)
    occupation = CharField(null=True)
    abilities = TextField(null=True)
    appearance = TextField(null=True)
    goals = TextField(null=True)
    story_id = ForeignKeyField(Story, backref='characters', on_delete='CASCADE')