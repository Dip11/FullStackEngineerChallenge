from datetime import datetime

from sqlalchemy.orm import relationship

from app import db
from app.models.users import User


class EmployeeToReview(db.Model):
    __tablename__ = 'employee_to_reviews'
    id = db.Column(db.Integer, primary_key=True)
    reviewed = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))
    reviewed_by = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))
    performance_phrase_id = db.Column(db.Integer, db.ForeignKey("performance_phrases.id", ondelete='CASCADE'))
    details = db.Column(db.String(length=255))
    star = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    # reviewed_by_user = relationship('User', back_populates="employee_to_review")
    performance_phrase = relationship('PerformancePhrase', back_populates="employee_to_review")

    @classmethod
    def from_args(cls,  reviewed: int, reviewed_by: int,
                  performance_phrase_id: int, details: str, star: int,
                  created_at: datetime, updated_at: datetime):
        instance = cls()
        instance.reviewed = reviewed
        instance.reviewed_by = reviewed_by
        instance.performance_phrase_id = performance_phrase_id
        instance.details = details
        instance.star = star
        instance.created_at = created_at
        instance.updated_at = updated_at
        return instance

    def to_json(self):
        return {
            'id': self.id,
            'reviewed': self.reviewed,
            'reviewedUser': self.get_user(self.reviewed),
            'reviewedByUser': self.get_user(self.reviewed_by),
            'reviewedBy': self.reviewed_by,
            'performancePhraseId': self.performance_phrase_id,
            'performancePhrase': self.performance_phrase if self.performance_phrase else None,
            'details': self.details,
            'star': self.star,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None
        }

    def get_user(self, user_id):
        user = User.query.filter(User.id == user_id).first()
        if user is not None:
            return user.to_json()
        else:
            return None