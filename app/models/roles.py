from datetime import datetime

from sqlalchemy.dialects import mysql
from sqlalchemy.orm import relationship

from app import db


class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)
    users = relationship('User', back_populates="user_role")


    @classmethod
    def from_args(cls, name: str,  created_at: datetime, updated_at: datetime):
        instance = cls()
        instance.name = name
        instance.created_at = created_at
        instance.updated_at = updated_at
        return instance

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None
        }

