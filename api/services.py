from flask import jsonify
from functools import wraps
from flask_login import current_user
from story import Story

def story_auth(func):
    @wraps(func)
    def func_wrapper(storyid, *args, **kwargs):
        story = Story.get_by_id(storyid)
        if (story.user != current_user):
            return jsonify(message='Unauthorized'), 401
        return func(storyid, *args, **kwargs)
    return func_wrapper