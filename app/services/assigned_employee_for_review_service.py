from datetime import datetime
from sqlalchemy import or_, and_, desc
from sqlalchemy.exc import SQLAlchemyError
from app import db
from app.models.exceptions import ServiceError
from app.models.assigned_employee_for_review import AssignedEmployeeForReview
from app.models.users import User


def find_all() -> [AssignedEmployeeForReview]:
    return AssignedEmployeeForReview.query.all()


def find_filtered(current_assigned_employee_for_review: User, queryParams) -> []:
    query_filter = queryParams.get('filter', {})
    limit = int(queryParams.get('pageSize', 10))
    offset = queryParams.get('pageNumber', 0) * limit
    search_text = query_filter.get('searchText', '')
    assigned_for = query_filter.get('assignedFor', None)
    assigned_user = query_filter.get('assignedUser', None)
    sort_order = query_filter.get('sortOrder', 'asc')
    sort_field = 'AssignedEmployeeForReview.'+query_filter.get('sortField', 'id')
    q = AssignedEmployeeForReview.query
    q = q.join(User, User.id == AssignedEmployeeForReview.assigned_employee).filter(or_(User.email.contains(search_text), User.first_name.contains(search_text),
                     User.last_name.contains(search_text)),
                 AssignedEmployeeForReview.assigned_for_employee == assigned_for if assigned_for is not None else True,
                 AssignedEmployeeForReview.assigned_employee == assigned_user if assigned_user is not None else True
                 )
    if sort_order == 'asc' and sort_field == 'id':
        return q.order_by(AssignedEmployeeForReview.id).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'desc' and sort_field == 'id':
        return q.order_by(desc(AssignedEmployeeForReview.id)).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'asc' and sort_field == 'assignedEmployee':
        return q.order_by(AssignedEmployeeForReview.assigned_employee).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'desc' and sort_field == 'assignedEmployee':
        return q.order_by(desc(AssignedEmployeeForReview.assignedEmployee)).offset(offset).limit(limit).all(), q.count()
    else:
        return q.offset(offset).limit(limit).all(), q.count()


def find_one(assigned_employee_for_review_id: int) -> AssignedEmployeeForReview:
    if assigned_employee_for_review_id is None:
        raise ServiceError
    return AssignedEmployeeForReview.query.filter_by(id=assigned_employee_for_review_id).first()


def save(assigned_employee_for_review_id: int, data: {}) -> AssignedEmployeeForReview:
    try:
        if assigned_employee_for_review_id is None:
            assigned_employee_for_review = AssignedEmployeeForReview.from_args(
                data.get('assignedEmployee') if data.get('assignedEmployee') is not '' else None,
                data.get('assignedForEmployee') if data.get('assignedForEmployee') is not '' else None,
                datetime.utcnow(),
                datetime.utcnow()
            )
            db.session.add(assigned_employee_for_review)
        else:
            assigned_employee_for_review = find_one(assigned_employee_for_review_id)
            assigned_employee_for_review.assigned_employee = data.get('assignedEmployee')
            assigned_employee_for_review.assigned_for_employee = data.get('assignedForEmployee')
            assigned_employee_for_review.updated_at = datetime.now()
        db.session.commit()

        return assigned_employee_for_review
    except SQLAlchemyError as e:
        code, msg = e.orig.args
        raise ServiceError


def delete(assigned_employee_for_review_id: int) -> bool:
    if assigned_employee_for_review_id is None:
        raise ServiceError
    try:
        assigned_employee_for_review = find_one(assigned_employee_for_review_id)
        db.session.delete(assigned_employee_for_review)
        db.session.commit()
        return True
    except SQLAlchemyError:
        raise ServiceError

