from peewee import *
from base import BaseModel

from user import User

class Story(BaseModel):
    user_id = ForeignKeyField(User, backref='stories')
    title = CharField()
    genre = CharField()
    description = TextField()