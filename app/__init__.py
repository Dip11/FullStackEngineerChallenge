from datetime import datetime, timedelta

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_oauthlib.provider import OAuth2Provider
from flask.globals import request, g
from flask.json import jsonify
from flask.helpers import make_response


app = Flask(__name__)
app.config.from_object('config.default')
app.config.from_pyfile('instance/production.cfg', silent=True)


db = SQLAlchemy()
db.init_app(app)



from app.models.grant import Grant
from app.models.client import Client
from app.models.tokens import Token
from app.models.roles import Role
from app.models.users import User
from app.models.performance_phrases import PerformancePhrase
from app.models.assigned_employee_for_review import AssignedEmployeeForReview
from app.models.employee_to_review import EmployeeToReview
from app.models.exceptions import BadRequest, Unauthorized, Forbidden, NotFound


def default_provider(app):
    oauth = OAuth2Provider(app)

    @oauth.clientgetter
    def get_client(client_id):
        return Client.query.filter_by(client_id=client_id).first()

    @oauth.grantgetter
    def get_grant(client_id, code):
        return Grant.query.filter_by(client_id=client_id, code=code).first()

    @oauth.grantsetter
    def set_grant(client_id, code, request, *args, **kwargs):
        expires = datetime.utcnow() + timedelta(seconds=100)
        grant = Grant(
            client_id=client_id,
            code=code['code'],
            redirect_uri=request.redirect_uri,
            scope=' '.join(request.scopes),
            user_id=g.user,
            expires=expires
        )
        db.session.add(grant)
        db.session.commit()

    @oauth.tokengetter
    def get_token(access_token=None, refresh_token=None):
        if access_token:
            return Token.query.filter_by(access_token=access_token).first()
        if refresh_token:
            return Token.query.filter_by(refresh_token=refresh_token).first()
        return None

    @oauth.tokensetter
    def set_token(token, request, *args, **kwargs):
        expires_in = token.get('expires_in')
        expires = datetime.utcnow() + timedelta(seconds=expires_in)
        tok = Token(
            access_token=token['access_token'],
            refresh_token=token['refresh_token'],
            token_type=token['token_type'],
            scope=token['scope'],
            expires=expires,
            client_id=request.client.client_id,
            user_id=request.user.id,
        )
        db.session.add(tok)
        db.session.commit()

    @oauth.usergetter
    def get_user(email, password, *args, **kwargs):
        user = User.query.filter_by(email=str(email)).first()
        if user is not None and user.check_password(password):
            # if int(args[1].body['role']) in [role.role_id for role in user.roles]:
            return user
        return None

    return oauth

oauth = default_provider(app)


from app.views.users import users
app.register_blueprint(users, url_prefix='/api/v1/users')

from app.views.assigned_employee_for_reviews import assigned_employee_for_reviews
app.register_blueprint(assigned_employee_for_reviews, url_prefix='/api/v1/assigned_employee_for_reviews')

from app.views.performance_phrases import performance_phrases
app.register_blueprint(performance_phrases, url_prefix='/api/v1/performance_phrases')

from app.views.employee_to_reviews import employee_to_reviews
app.register_blueprint(employee_to_reviews, url_prefix='/api/v1/employee_to_reviews')



@app.before_request
def options_autoreply():
    if request.method == 'OPTIONS':
        resp = app.make_default_options_response()
        headers = None
        if 'ACCESS_CONTROL_REQUEST_HEADERS' in request.headers:
            headers = request.headers['ACCESS_CONTROL_REQUEST_HEADERS']
        h = resp.headers
        h['Access-Control-Allow-Origin'] = request.headers['Origin']
        h['Access-Control-Allow-Methods'] = request.headers['Access-Control-Request-Method']
        if headers is not None:
            h['Access-Control-Allow-Headers'] = headers
        return resp


@app.after_request
def set_allow_origin(resp):
    h = resp.headers
    if request.method != 'OPTIONS' and 'Origin' in request.headers:
        h['Access-Control-Allow-Origin'] = request.headers['Origin']
        h['Access-Control-Allow-Credentials'] = "false"
        h['Access-Control-Max-Age'] = "3600"
    return resp


@app.route('/oauth/token', methods=['POST'])
@oauth.token_handler
def access_token():
    return {}


@app.route('/oauth/revoke', methods=['POST'])
@oauth.revoke_handler
def revoke_token():
    pass


@app.route('/oauth/user_info', methods=['GET'])
@oauth.require_oauth('user_info')
def user_info():
    user = request.oauth.user
    return jsonify(user.to_json())


@app.errorhandler(401)
def handler_unauthorized(error):
    return make_response(jsonify({'message': 'Unauthorized'}), 401)


@app.errorhandler(404)
def handle_not_found(error):
    return make_response(jsonify({'message': 'Not Found'}), 404)


@app.errorhandler(500)
def handle_internal_server_error(error):
    return make_response(jsonify({'message': 'Internal Server Error'}), 500)


@app.errorhandler(BadRequest)
def handle_bad_request_exception(error):
    return make_response(jsonify(error.to_json()), error.status_code)


@app.errorhandler(Unauthorized)
def handle_unauthorized_exception(error):
    return make_response(jsonify(error.to_json()), error.status_code)


@app.errorhandler(Forbidden)
def handle_forbidden_exception(error):
    return make_response(jsonify(error.to_json()), error.status_code)


@app.errorhandler(NotFound)
def handle_not_found_exception(error):
    return make_response(jsonify(error.to_json()), error.status_code)


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

