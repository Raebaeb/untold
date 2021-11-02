from peewee import *
from base import BaseModel
from timeline import Timeline

class Event(BaseModel):
    timeline_id = ForeignKeyField(Timeline, backref='events')
    position = IntegerField()
    title = CharField()
    description = CharField()
    is_trucker = BooleanField()