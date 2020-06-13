from datetime import datetime

from sqlalchemy.dialects import mysql
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from app import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255))

    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    role = db.Column(db.Integer, db.ForeignKey("roles.id", ondelete='CASCADE'))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)

    user_role = relationship('Role', back_populates="users")
    # assigned_employee_for_review = relationship('AssignedEmployeeForReview', back_populates="assigned_employee_data")
    # employee_to_review = relationship('EmployeeToReview', back_populates="reviewed_by_user")


    @classmethod
    def from_args(cls,  email: str, password: str, role: int,
                  first_name: str, last_name: str,
                  created_at: datetime, updated_at: datetime):
        instance = cls()
        instance.email = email
        if password is not None:
            instance.hash_clean_password(password)
        instance.role = role
        instance.first_name = first_name
        instance.last_name = last_name
        instance.created_at = created_at
        instance.updated_at = updated_at
        return instance

    def to_json(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None
        }

    def get_user_id(self):
        return self.id

    def hash_clean_password(self, clean_password):
        self.password = generate_password_hash(str(clean_password))

    def check_password(self, clean_password):
        return check_password_hash(self.password, clean_password)

