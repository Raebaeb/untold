from peewee import *
from models.base import BaseModel
from models.story import Story

class Scene(BaseModel):
    title = CharField()
    participants = TextField(null=True)
    location = TextField()
    summary = TextField()
    notes = TextField(null=True)
    story_id = ForeignKeyField(Story, backref='scenes')