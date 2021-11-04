from peewee import *
from base import BaseModel

from story import Story

class Scene(BaseModel):
    title = CharField()
    participants = TextField(null=True)
    location = TextField()
    summary = TextField()
    notes = TextField(null=True)
    story_id = ForeignKeyField(Story, backref='scenes')