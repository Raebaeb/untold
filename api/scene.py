from peewee import *
from base import BaseModel

from story import Story

class Scene(BaseModel):
    title = CharField()
    participants = TextField()
    location = TextField()
    summary = TextField()
    notes = TextField()
    story_id = ForeignKeyField(Story, backref='scenes')