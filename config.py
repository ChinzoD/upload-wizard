import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
                              'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LISTS_PER_PAGE = 20
    MAX_CONTENT_LENGTH = 100 * 1024 * 1024
    UPLOAD_FOLDER = 'app/static/files/'
    # MAIL_SERVER = os.environ.get('MAIL_SERVER')
    # MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    # MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    # MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    # MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    # ADMINS = ['chinzo.dandar@gmail.com']

    # # Flask-Security config
    # SECURITY_URL_PREFIX = "/admin"
    # SECURITY_PASSWORD_HASH = "pbkdf2_sha512"
    # SECURITY_PASSWORD_SALT = "ATGUOHAELKiubahiughaerGOJAEGj"
    #
    # Flask-Security URLs, overridden because they don't put a / at the end
    # SECURITY_LOGIN_URL = "/login/"
    # SECURITY_LOGOUT_URL = "/logout/"
    # SECURITY_REGISTER_URL = "/register/"
    #
    # SECURITY_POST_LOGIN_VIEW = "/admin/"
    # SECURITY_POST_LOGOUT_VIEW = "/admin/"
    # SECURITY_POST_REGISTER_VIEW = "/admin/"

    # Flask-Security features
    # SECURITY_REGISTERABLE = True
    # SECURITY_SEND_REGISTER_EMAIL = False
    # SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail SMTP server settings
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False

    # Flask-Mail SMTP account settings
    MAIL_USERNAME = 'chinzo.dandar@gmail.com'
    MAIL_PASSWORD = 'password'
    MAIL_DEFAULT_SENDER = 'chinzo.dandar@gmail.com'

    # Flask-User settings
    USER_APP_NAME = "Flask-User Basic App"  # Shown in and email templates and page footers
    USER_ENABLE_EMAIL = True  # Enable email authentication
    USER_ENABLE_USERNAME = True  # Disable username authentication
    USER_EMAIL_SENDER_NAME = USER_APP_NAME
    USER_EMAIL_SENDER_EMAIL = "chinzo.dandar@gmail.com"

    CSRF_ENABLED = True

