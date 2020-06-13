from flask import render_template
from flask.blueprints import Blueprint
from flask.globals import request
from flask.json import jsonify
from app import oauth
from app.models.exceptions import ServiceError, BadRequest, NotFound, DuplicateUserError
from app.services import performance_phrase_service

performance_phrases = Blueprint('performance_phrases', __name__)


@performance_phrases.route('', methods=['GET'])
def find_all():
    try:
        response = [n.to_json() for n in performance_phrase_service.find_all()]
        return jsonify({'response': response})
    except ServiceError:
        raise BadRequest('A service error occurred')


@performance_phrases.route('/find-filtered', methods=['POST'])
@oauth.require_oauth('user_info')
def find():
    try:
        items, totalCount = performance_phrase_service.find_filtered(request.oauth.user, request.get_json())
        response = [n.to_json() for n in items]
        return jsonify({'response': response, 'totalCount': totalCount})
    except ServiceError:
        raise BadRequest('A service error occurred')


@performance_phrases.route('/<performance_phrase_id>')
@oauth.require_oauth('user_info')
def find_one(performance_phrase_id: int):
    try:
        performance_phrase = performance_phrase_service.find_one(performance_phrase_id)
        if performance_phrase is None:
            raise NotFound('User with id {id} was not found'.format(id=performance_phrase_id))
        return jsonify({'response': performance_phrase.to_json()})
    except ServiceError:
        raise BadRequest('A service error occurred')


@performance_phrases.route('', methods=['POST'])
@oauth.require_oauth('user_info')
def add():
    try:
        performance_phrase = performance_phrase_service.save(None, request.get_json())
        return jsonify({
            'response': performance_phrase.to_json()
        })
    except DuplicateUserError:
        raise BadRequest('Duplicate performance_phrase', None, 1062)
    except ServiceError:
        raise BadRequest('Could not add a new performance_phrase')


@performance_phrases.route('/<performance_phrase_id>', methods=['PUT'])
@oauth.require_oauth('user_info')
def update(performance_phrase_id: int):
    try:
        performance_phrase = performance_phrase_service.save(performance_phrase_id, request.get_json())
        return jsonify({
            'response': performance_phrase.to_json()
        })
    except ServiceError:
        raise BadRequest('Could not update performance_phrase with id {id}'.format(id=performance_phrase_id))


@performance_phrases.route('/<performance_phrase_id>', methods=['DELETE'])
@oauth.require_oauth('user_info')
def delete(performance_phrase_id: int):
    try:
        performance_phrase = performance_phrase_service.delete(performance_phrase_id)
        return jsonify({
            'response': 'Deleted performance_phrase with id {id}'.format(id=performance_phrase_id)
        })
    except ServiceError:
        raise BadRequest('Could not delete performance_phrase with id {id}'.format(id=performance_phrase_id))

