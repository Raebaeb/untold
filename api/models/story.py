from peewee import *
from models.base import BaseModel
from models.user import User

class Story(BaseModel):
    user = ForeignKeyField(User, backref='stories')
    title = CharField()
    genre = CharField()
    description = TextField()