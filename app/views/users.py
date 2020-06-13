from flask.blueprints import Blueprint
from flask.globals import request
from flask.json import jsonify
from app import oauth
from app.models.exceptions import ServiceError, BadRequest, NotFound, DuplicateUserError
from app.services import user_service

users = Blueprint('users', __name__)


@users.route('', methods=['GET'])
def find_all():
    try:
        response = [n.to_json() for n in user_service.find_all()]
        return jsonify({'response': response})
    except ServiceError:
        raise BadRequest('A service error occurred')


@users.route('/find-filtered', methods=['POST'])
@oauth.require_oauth('user_info')
def find():
    try:
        items, totalCount = user_service.find_filtered(request.oauth.user, request.get_json())
        response = [n.to_json() for n in items]
        return jsonify({'response': response, 'totalCount': totalCount})
    except ServiceError:
        raise BadRequest('A service error occurred')


@users.route('/<user_id>')
@oauth.require_oauth('user_info')
def find_one(user_id: int):
    try:
        user = user_service.find_one(user_id)
        if user is None:
            raise NotFound('User with id {id} was not found'.format(id=user_id))
        return jsonify({'response': user.to_json()})
    except ServiceError:
        raise BadRequest('A service error occurred')


@users.route('', methods=['POST'])
@oauth.require_oauth('user_info')
def add():
    try:
        user = user_service.save(None, request.get_json())
        return jsonify({
            'response': user.to_json()
        })
    except DuplicateUserError:
        raise BadRequest('Duplicate user', None, 1062)
    except ServiceError:
        raise BadRequest('Could not add a new user')


@users.route('/<user_id>/upload-profile-pic', methods=['POST'])
@oauth.require_oauth('user_info')
def uploadPic(user_id: int):
    try:
        user = user_service.upload_image(user_id, request)
        return jsonify({
            'response': user.to_json()
        })
    except ServiceError:
        raise BadRequest('Could not upload pic for user with id {id}'.format(id=user_id))


@users.route('/<user_id>', methods=['PUT'])
@oauth.require_oauth('user_info')
def update(user_id: int):
    try:
        user = user_service.save(user_id, request.get_json())
        return jsonify({
            'response': user.to_json()
        })
    except ServiceError:
        raise BadRequest('Could not update user with id {id}'.format(id=user_id))


@users.route('/<user_id>', methods=['DELETE'])
@oauth.require_oauth('user_info')
def delete(user_id: int):
    try:
        user_service.delete(user_id)
        return jsonify({
            'response': 'Deleted user with id {id}'.format(id=user_id)
        })
    except ServiceError:
        raise BadRequest('Could not delete user with id {id}'.format(id=user_id))
