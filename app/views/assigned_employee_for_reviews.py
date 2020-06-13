from flask.blueprints import Blueprint
from flask.globals import request
from flask.json import jsonify
from app import oauth
from app.models.exceptions import ServiceError, BadRequest, NotFound, DuplicateUserError
from app.services import assigned_employee_for_review_service

assigned_employee_for_reviews = Blueprint('assigned_employee_for_reviews', __name__)


@assigned_employee_for_reviews.route('', methods=['GET'])
def find_all():
    try:
        response = [n.to_json() for n in assigned_employee_for_review_service.find_all()]
        return jsonify({'response': response})
    except ServiceError:
        raise BadRequest('A service error occurred')


@assigned_employee_for_reviews.route('/find-filtered', methods=['POST'])
@oauth.require_oauth('user_info')
def find():
    try:
        items, totalCount = assigned_employee_for_review_service.find_filtered(request.oauth.user, request.get_json())
        response = [n.to_json() for n in items]
        return jsonify({'response': response, 'totalCount': totalCount})
    except ServiceError:
        raise BadRequest('A service error occurred')


@assigned_employee_for_reviews.route('/<assigned_employee_for_review_id>')
@oauth.require_oauth('user_info')
def find_one(assigned_employee_for_review_id: int):
    try:
        assigned_employee_for_review = assigned_employee_for_review_service.find_one(assigned_employee_for_review_id)
        if assigned_employee_for_review is None:
            raise NotFound('User with id {id} was not found'.format(id=assigned_employee_for_review_id))
        return jsonify({'response': assigned_employee_for_review.to_json()})
    except ServiceError:
        raise BadRequest('A service error occurred')


@assigned_employee_for_reviews.route('', methods=['POST'])
@oauth.require_oauth('user_info')
def add():
    try:
        assigned_employee_for_review = assigned_employee_for_review_service.save(None, request.get_json())
        return jsonify({
            'response': assigned_employee_for_review.to_json()
        })
    except DuplicateUserError:
        raise BadRequest('Duplicate assigned_employee_for_review', None, 1062)
    except ServiceError:
        raise BadRequest('Could not add a new assigned_employee_for_review')


@assigned_employee_for_reviews.route('/<assigned_employee_for_review_id>', methods=['PUT'])
@oauth.require_oauth('user_info')
def update(assigned_employee_for_review_id: int):
    try:
        assigned_employee_for_review = assigned_employee_for_review_service.save(assigned_employee_for_review_id, request.get_json())
        return jsonify({
            'response': assigned_employee_for_review.to_json()
        })
    except ServiceError:
        raise BadRequest('Could not update assigned_employee_for_review with id {id}'.format(id=assigned_employee_for_review_id))


@assigned_employee_for_reviews.route('/<assigned_employee_for_review_id>', methods=['DELETE'])
@oauth.require_oauth('user_info')
def delete(assigned_employee_for_review_id: int):
    try:
        assigned_employee_for_review = assigned_employee_for_review_service.delete(assigned_employee_for_review_id)
        return jsonify({
            'response': 'Deleted assigned_employee_for_review with id {id}'.format(id=assigned_employee_for_review_id)
        })
    except ServiceError:
        raise BadRequest('Could not delete assigned_employee_for_review with id {id}'.format(id=assigned_employee_for_review_id))
