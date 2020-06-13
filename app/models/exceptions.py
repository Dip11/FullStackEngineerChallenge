class BadRequest(Exception):
    status_code = 400

    error_code = 0

    def __init__(self, message, status_code=None, error_code=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        if error_code is not None:
            self.error_code = error_code

    def to_json(self):
        return {'message': self.message, 'error_code': self.error_code}


class Unauthorized(Exception):
    status_code = 401

    def __init__(self, message, status_code=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code

    def to_json(self):
        return {'message': self.message}


class Forbidden(Exception):
    status_code = 403

    def __init__(self, message, status_code=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code

    def to_json(self):
        return {'message': self.message}


class NotFound(Exception):
    status_code = 404

    def __init__(self, message, status_code=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code

    def to_json(self):
        return {'message': self.message}


class ServiceError(Exception):
    def __init__(self):
        Exception.__init__(self)


class DuplicateUserError(Exception):
    def __init__(self):
        Exception.__init__(self)
