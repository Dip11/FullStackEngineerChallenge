from datetime import datetime

from sqlalchemy.orm import relationship

from app import db


class PerformancePhrase(db.Model):
    __tablename__ = 'performance_phrases'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    tag = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    employee_to_review = relationship('EmployeeToReview', back_populates="performance_phrase")


    @classmethod
    def from_args(cls, name: str, tag: str,  created_at: datetime, updated_at: datetime):
        instance = cls()
        instance.name = name
        instance.tag = tag
        instance.created_at = created_at
        instance.updated_at = updated_at
        return instance

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'tag': self.tag,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None
        }

