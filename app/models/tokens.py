from datetime import datetime, timedelta

from sqlalchemy.orm import relationship

from app import db


class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE', name='token_user_id_fk'))
    user = relationship('User')
    client_id = db.Column(db.String(40), db.ForeignKey('client.client_id', ondelete='CASCADE', name='token_client_id_fk'), nullable=False)
    client = relationship('Client')
    token_type = db.Column(db.String(40))
    access_token = db.Column(db.String(255))
    refresh_token = db.Column(db.String(255))
    expires = db.Column(db.DateTime)
    scope = db.Column(db.Text)

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        self.expires = datetime.utcnow() + timedelta(6 * 365 / 12)  # longen a half year

    @property
    def scopes(self):
        if self.scope:
            return self.scope.split()
        return []

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self
