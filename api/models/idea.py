from peewee import *
from models.base import BaseModel
from models.story import Story

class Idea(BaseModel):
    title = CharField()
    text = TextField()
    story_id = ForeignKeyField(Story, backref='ideas', on_delete='CASCADE')
