from datetime import datetime
from sqlalchemy import or_, and_, desc
from sqlalchemy.exc import SQLAlchemyError
from app import db
from app.models.exceptions import ServiceError
from app.models.performance_phrases import PerformancePhrase
from app.models.employee_to_review import EmployeeToReview
from app.models.users import User


def find_all() -> [PerformancePhrase]:
    return PerformancePhrase.query.all()


def find_filtered(current_performance_phrase: User, queryParams) -> []:
    query_filter = queryParams.get('filter', {})
    limit = int(queryParams.get('pageSize', 10))
    offset = queryParams.get('pageNumber', 0) * limit
    search_text = query_filter.get('searchText', '')
    reviewed_by = query_filter.get('reviewedBy', None)
    reviewed = query_filter.get('reviewed', None)
    if reviewed is not None and reviewed_by is not None:
        q1 = EmployeeToReview.query.filter(
            and_(EmployeeToReview.reviewed_by == reviewed_by,
                 EmployeeToReview.reviewed == reviewed,
                 )).all()
        not_in = []
        for p in q1:
            not_in.append(p.performance_phrase_id)

        q = PerformancePhrase.query.filter(PerformancePhrase.id.notin_(not_in))
        return q.offset(offset).limit(limit).all(), q.count()
    else:
        q = PerformancePhrase.query
        return q.offset(offset).limit(limit).all(), q.count()


def find_one(performance_phrase_id: int) -> PerformancePhrase:
    if performance_phrase_id is None:
        raise ServiceError
    return PerformancePhrase.query.filter_by(id=performance_phrase_id).first()


def save(performance_phrase_id: int, data: {}) -> PerformancePhrase:
    try:
        if performance_phrase_id is None:
            performance_phrase = PerformancePhrase.from_args(
                data.get('name') if data.get('name') is not '' else None,
                data.get('tag') if data.get('tag') is not '' else None,
                datetime.utcnow(),
                datetime.utcnow()
            )
            db.session.add(performance_phrase)
        else:
            performance_phrase = find_one(performance_phrase_id)
            performance_phrase.name = data.get('name')
            performance_phrase.tag = data.get('tag')
            performance_phrase.updated_at = datetime.now()
        db.session.commit()

        return performance_phrase
    except SQLAlchemyError as e:
        code, msg = e.orig.args
        raise ServiceError


def delete(performance_phrase_id: int) -> bool:
    if performance_phrase_id is None:
        raise ServiceError
    try:
        performance_phrase = find_one(performance_phrase_id)
        db.session.delete(performance_phrase)
        db.session.commit()
        return True
    except SQLAlchemyError:
        raise ServiceError

