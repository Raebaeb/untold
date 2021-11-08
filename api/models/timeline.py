from peewee import *
from models.base import BaseModel
from models.story import Story

class Timeline(BaseModel):
    story_id = ForeignKeyField(Story, backref='timelines', on_delete='CASCADE')