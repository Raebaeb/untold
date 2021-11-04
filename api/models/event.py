from peewee import *
from models.base import BaseModel
from models.timeline import Timeline

class Event(BaseModel):
    timeline_id = ForeignKeyField(Timeline, backref='events')
    position = IntegerField(unique=True)
    title = CharField()
    description = CharField(null=True)