from app import db
from app.models.users import User


class Client(db.Model):
    name = db.Column(db.String(40))
    client_id = db.Column(db.String(40), primary_key=True)
    client_secret = db.Column(db.String(55), unique=True, index=True, nullable=False)
    client_type = db.Column(db.String(20), default='public')
    _redirect_uris = db.Column(db.Text)
    _default_scopes = db.Column(db.Text, default='user_info')

    @classmethod
    def from_args(cls, name: str, client_id: str, client_secret: str, client_type: str,
                  _redirect_uris: str, _default_scopes: str):
        instance = cls()
        instance.name = name
        instance.client_id = client_id
        instance.client_secret = client_secret
        instance.client_type = client_type
        instance._redirect_uris = _redirect_uris
        instance._default_scopes = _default_scopes
        return instance

    def to_json(self):
        return {
            'name': self.name,
            'clientId': self.client_id,
            'clientSecret': self.client_secret,
            'clientType': self.client_type,
            'redirectUris': self._redirect_uris,
            'defaultScopes': self._default_scopes
        }

    @property
    def user(self):
        return User.query.get(1)

    @property
    def redirect_uris(self):
        if self._redirect_uris:
            return self._redirect_uris.split()
        return []

    @property
    def default_redirect_uri(self):
        return self.redirect_uris[0]

    @property
    def default_scopes(self):
        if self._default_scopes:
            return self._default_scopes.split()
        return []

    @property
    def allowed_grant_types(self):
        return ['authorization_code', 'password', 'client_credentials', 'refresh_token']
