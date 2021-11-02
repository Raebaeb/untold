from peewee import *
from base import BaseModel

from story import Story

class Idea(BaseModel):
    title = CharField()
    text = TextField()
    story_id = ForeignKeyField(Story, backref='ideas')
