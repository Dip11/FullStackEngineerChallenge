import json
from datetime import datetime
from operator import and_

from sqlalchemy.exc import SQLAlchemyError
from app import db
from app.models.exceptions import ServiceError
from app.models.employee_to_review import EmployeeToReview
from app.models.users import User
from app.models.performance_phrases import PerformancePhrase
from app.services import performance_phrase_service


def find_all() -> [EmployeeToReview]:
    return EmployeeToReview.query.all()


def find_filtered(current_user: User, queryParams) -> []:
    query_filter = queryParams.get('filter', {})
    limit = int(queryParams.get('pageSize', 10))
    offset = queryParams.get('pageNumber', 0) * limit
    search_text = query_filter.get('searchText', '')
    reviewed_by = query_filter.get('reviewedBy', None)
    reviewed = query_filter.get('reviewed', None)

    result = []
    try:
        if reviewed is not None and reviewed_by is not None:
            q1 = EmployeeToReview.query.filter(
                and_(EmployeeToReview.reviewed_by == reviewed_by,
                     EmployeeToReview.reviewed == reviewed,
                     )).all()
            not_in = []
            for item in q1:
                not_in.append(item.performance_phrase_id)
                new_et = {}
                new_et['id'] = item.id
                new_et['reviewed'] = item.reviewed
                new_et['reviewedBy'] = item.reviewed_by
                new_et['details'] = item.details
                new_et['performancePhraseId'] = item.performance_phrase_id
                new_et['performancePhrase'] = performance_phrase_service.find_one(item.performance_phrase_id).to_json()
                result.append(new_et)
            q = PerformancePhrase.query.filter(PerformancePhrase.id.notin_(not_in)).all()
            for item2 in q:
                new_etr = {}
                new_etr['id'] = None
                new_etr['reviewedBy'] = reviewed_by
                new_etr['reviewed'] = reviewed
                new_etr['details'] = ''
                new_etr['performancePhraseId'] = item2.id
                new_etr['performancePhrase'] = performance_phrase_service.find_one(item2.id).to_json()
                result.append(new_etr)
        return result
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print("error")
        raise ServiceError


def find_one(employee_to_review_id: int) -> EmployeeToReview:
    if employee_to_review_id is None:
        raise ServiceError
    return EmployeeToReview.query.filter_by(id=employee_to_review_id).first()


def save(employee_to_review_id: int, data: {}) -> EmployeeToReview:
    try:
        if employee_to_review_id is None:
            employee_to_review = EmployeeToReview.from_args(
                data.get('reviewed') if data.get('reviewed') is not '' else None,
                data.get('reviewedBy') if data.get('reviewedBy') is not '' else None,
                data.get('performancePhraseId') if data.get('performancePhraseId') is not '' else None,
                data.get('details') if data.get('details') is not '' else None,
                data.get('star') if data.get('star') is not '' else None,
                datetime.utcnow(),
                datetime.utcnow()
            )
            db.session.add(employee_to_review)
        else:
            employee_to_review = find_one(employee_to_review_id)
            employee_to_review.reviewed_by = data.get('reviewedBy') if data.get('reviewedBy') is not None else employee_to_review.reviewed_by
            employee_to_review.reviewed = data.get('reviewed') if data.get('reviewed') is not None else employee_to_review.reviewed
            employee_to_review.performance_phrase_id = data.get('performancePhraseId') if data.get('performancePhraseId') is not None else employee_to_review.reviewed
            employee_to_review.details = data.get('details') if data.get('details') is not None else employee_to_review.reviewed
            employee_to_review.star = data.get('star') if data.get('star') is not None else employee_to_review.reviewed
            employee_to_review.updated_at = datetime.now()
        db.session.commit()

        return employee_to_review
    except SQLAlchemyError as e:
        code, msg = e.orig.args
        raise ServiceError


def delete(employee_to_review_id: int) -> bool:
    if employee_to_review_id is None:
        raise ServiceError
    try:
        employee_to_review = find_one(employee_to_review_id)
        db.session.delete(employee_to_review)
        db.session.commit()
        return True
    except SQLAlchemyError:
        raise ServiceError

