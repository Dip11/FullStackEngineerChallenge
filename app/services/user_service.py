import random
import string
from datetime import datetime
from time import strptime
from flask import render_template, request
from sqlalchemy import or_, and_, desc
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.utils import secure_filename
from app import db
from app.models.exceptions import ServiceError, DuplicateUserError
from app.models.users import User
from app.models.assigned_employee_for_review import AssignedEmployeeForReview
import os


def find_all() -> [User]:
    return User.query.all()


def find_filtered(current_user: User, queryParams) -> []:
    query_filter = queryParams.get('filter', {})
    limit = int(queryParams.get('pageSize', 10))
    offset = queryParams.get('pageNumber', 0) * limit
    search_text = query_filter.get('searchText', '')
    excluding_user_id = query_filter.get('excludingUserId', None)
    excluding_already_added_employee = query_filter.get('excludingAlreadyAddedEmployee', None)
    sort_order = query_filter.get('sortOrder', 'asc')
    sort_field = 'User.'+query_filter.get('sortField', 'id')
    role = query_filter.get('role', None)

    if excluding_already_added_employee is not None and excluding_user_id is not None:
        excluding_added_employees = AssignedEmployeeForReview.query.filter(AssignedEmployeeForReview.assigned_for_employee == excluding_user_id).all()
        ids_to_be_excluded = []
        for excluding_added_employee in excluding_added_employees:
            ids_to_be_excluded.append(excluding_added_employee.assigned_employee)

    q = User.query
    q = q.filter(or_(User.email.contains(search_text), User.first_name.contains(search_text),
                     User.last_name.contains(search_text)),
                 User.id != excluding_user_id if excluding_user_id is not None else True,
                 User.id.notin_(ids_to_be_excluded) if excluding_already_added_employee is not None and len(ids_to_be_excluded) >0 else True,
                 User.role == role
                 )
    if sort_order == 'asc' and sort_field == 'id':
        return q.order_by(User.id).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'desc' and sort_field == 'id':
        return q.order_by(desc(User.id)).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'asc' and sort_field == 'firstName':
        return q.order_by(User.first_name).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'desc' and sort_field == 'firstName':
        return q.order_by(desc(User.first_name)).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'asc' and sort_field == 'lastName':
        return q.order_by(User.last_name).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'desc' and sort_field == 'lastName':
        return q.order_by(desc(User.last_name)).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'asc' and sort_field == 'email':
        return q.order_by(User.email).offset(offset).limit(limit).all(), q.count()
    elif sort_order == 'desc' and sort_field == 'email':
        return q.order_by(desc(User.email)).offset(offset).limit(limit).all(), q.count()
    else:
        return q.offset(offset).limit(limit).all(), q.count()

def find_one(user_id: int) -> User:
    if user_id is None:
        raise ServiceError
    return User.query.filter_by(id=user_id).first()


def save(user_id: int, data: {}) -> User:
    try:
        print(data)
        if user_id is None:
            user = User.from_args(
                data.get('email') if data.get('email') is not '' else None,
                data.get('password') if data.get('password') is not '' else None,
                2,
                data.get('firstName') if data.get('firstName') is not '' else None,
                data.get('lastName') if data.get('lastName') is not '' else None,
                datetime.utcnow(),
                datetime.utcnow()
            )
            db.session.add(user)
        else:
            user = find_one(user_id)
            user.email = data.get('email')
            if data.get('password'):
                user.hash_clean_password(data.get('password'))
            user.first_name = data.get('firstName')
            user.last_name = data.get('lastName')
            user.updated_at = data.get('updatedAt') if data.get('updatedAt') is not '' else datetime.now()
        db.session.commit()

        return user
    except SQLAlchemyError as e:
        code, msg = e.orig.args
        if code == 1062:
            raise DuplicateUserError
        raise ServiceError


def delete(user_id: int) -> bool:
    if user_id is None:
        raise ServiceError
    try:
        user = find_one(user_id)
        db.session.delete(user)
        db.session.commit()
        return True
    except SQLAlchemyError:
        raise ServiceError
