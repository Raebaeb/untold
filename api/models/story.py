from peewee import *
from models.base import BaseModel
from models.user import User

class Story(BaseModel):
    user = ForeignKeyField(User, backref='stories', on_delete='CASCADE')
    title = CharField()
    genre = CharField(null=True)
    description = TextField(null=True)