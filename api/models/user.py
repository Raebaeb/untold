from flask_login import UserMixin
from peewee import *
from models.base import BaseModel

class User(UserMixin, BaseModel):
    email = CharField(unique=True)
    password = CharField()
    first_name = CharField()
    last_name = CharField()
