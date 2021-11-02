from peewee import *
from base import BaseModel

from story import Story

class Timeline(BaseModel):
    story_id = ForeignKeyField(Story, unique=True, backref='timelines')