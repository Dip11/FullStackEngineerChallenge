from flask import render_template
from flask.blueprints import Blueprint
from flask.globals import request
from flask.json import jsonify

from app import oauth
from app.models.exceptions import ServiceError, BadRequest, NotFound, DuplicateUserError
from app.services import employee_to_review_service

employee_to_reviews = Blueprint('employee_to_reviews', __name__)


@employee_to_reviews.route('', methods=['GET'])
def find_all():
    try:
        response = [n.to_json() for n in employee_to_review_service.find_all()]
        return jsonify({'response': response})
    except ServiceError:
        raise BadRequest('A service error occurred')


@employee_to_reviews.route('/find-filtered', methods=['POST'])
@oauth.require_oauth('user_info')
def find():
    try:
        items = employee_to_review_service.find_filtered(request.oauth.user, request.get_json())
        return jsonify({'response': items})
    except ServiceError:
        raise BadRequest('A service error occurred')


@employee_to_reviews.route('/<employee_to_review_id>')
@oauth.require_oauth('user_info')
def find_one(employee_to_review_id: int):
    try:
        employee_to_review = employee_to_review_service.find_one(employee_to_review_id)
        if employee_to_review is None:
            raise NotFound('User with id {id} was not found'.format(id=employee_to_review_id))
        return jsonify({'response': employee_to_review.to_json()})
    except ServiceError:
        raise BadRequest('A service error occurred')


@employee_to_reviews.route('', methods=['POST'])
@oauth.require_oauth('user_info')
def add():
    try:
        employee_to_review = employee_to_review_service.save(None, request.get_json())
        return jsonify({
            'response': employee_to_review.id
        })
    except DuplicateUserError:
        raise BadRequest('Duplicate employee_to_review', None, 1062)
    except ServiceError:
        raise BadRequest('Could not add a new employee_to_review')



@employee_to_reviews.route('/<employee_to_review_id>', methods=['PUT'])
@oauth.require_oauth('user_info')
def update(employee_to_review_id: int):
    try:
        employee_to_review = employee_to_review_service.save(employee_to_review_id, request.get_json())
        return jsonify({
            'response': employee_to_review.id
        })
    except ServiceError:
        raise BadRequest('Could not update employee_to_review with id {id}'.format(id=employee_to_review_id))


@employee_to_reviews.route('/<employee_to_review_id>', methods=['DELETE'])
@oauth.require_oauth('user_info')
def delete(employee_to_review_id: int):
    try:
        employee_to_review = employee_to_review_service.delete(employee_to_review_id)
        return jsonify({
            'response': 'Deleted employee_to_review with id {id}'.format(id=employee_to_review_id)
        })
    except ServiceError:
        raise BadRequest('Could not delete employee_to_review with id {id}'.format(id=employee_to_review_id))

