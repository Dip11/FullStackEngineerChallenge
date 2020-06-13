import random
import string
from datetime import datetime

from app import db, app
from app.models.client import Client
from app.models.roles import Role
from app.models.users import User


def get_random_alpha_numeric_string(string_length=10):
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join((random.choice(letters_and_digits) for i in range(string_length)))


def create_client():
    client = Client.from_args(
        'client',
        'ui',
        get_random_alpha_numeric_string(),
        'ui',
        '127.1.0.0',
        'user_info'
    )

    db.session.add(client)
    db.session.commit()


def create_roles():
    admin = Role.from_args(
        'admin',
        datetime.utcnow(),
        datetime.utcnow()
    )

    db.session.add(admin)
    db.session.commit()

    employee = Role.from_args(
        'employee',
        datetime.utcnow(),
        datetime.utcnow()
    )

    db.session.add(employee)
    db.session.commit()


def create_users():
    admin_user = User.from_args(
        'admin@paypay.com',
        'testtest',
        '1',
        'PayPay',
        'Admin',
        datetime.utcnow(),
        datetime.utcnow()
    )

    db.session.add(admin_user)
    db.session.commit()

    employee_user = User.from_args(
        'employee1@paypay.com',
        'testtest',
        '2',
        'Employee',
        '1',
        datetime.utcnow(),
        datetime.utcnow()
    )

    db.session.add(employee_user)
    db.session.commit()


with app.app_context():
    create_client()
    create_roles()
    create_users()
