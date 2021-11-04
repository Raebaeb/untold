from peewee import *
import datetime
from db import DATABASE

class BaseModel(Model):
    id = PrimaryKeyField()
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = DATABASE