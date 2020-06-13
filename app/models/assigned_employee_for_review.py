from datetime import datetime

from sqlalchemy.orm import relationship

from app import db
from app.models.users import User


class AssignedEmployeeForReview(db.Model):
    __tablename__ = 'assigned_employee_for_reviews'
    id = db.Column(db.Integer, primary_key=True)
    assigned_employee = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))
    assigned_for_employee = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def get_user_data(self, id):
        return User.query.filter(User.id ==id ).first()
    @classmethod
    def from_args(cls,  assigned_employee: int, assigned_for_employee: int,
                  created_at: datetime, updated_at: datetime):
        instance = cls()
        instance.assigned_employee = assigned_employee
        instance.assigned_for_employee = assigned_for_employee
        instance.created_at = created_at
        instance.updated_at = updated_at
        return instance

    def to_json(self):
        return {
            'id': self.id,
            'assignedEmployee': self.assigned_employee,
            'assignedEmployeeData': self.get_user_data(self.assigned_employee).to_json() if self.assigned_employee else None,
            'assignedForEmployeeData': self.get_user_data(self.assigned_for_employee).to_json() if self.assigned_for_employee else None,
            'assignedForEmployee': self.assigned_for_employee,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None
        }

