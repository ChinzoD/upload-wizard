__version__ = '0.1'
__author__ = 'Chinzorig Dandarchuluun'
__copyright__ = "Copyright, UC Reagents"

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
                              'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LISTS_PER_PAGE = 20
    MAX_CONTENT_LENGTH = 1024 * 1024 * 1024
    UPLOAD_FOLDER = ''
    LOGO_UPLOAD_FOLDER = ''
    LOGO_UPLOAD_FOLDER_URL = ''

    # Flask-Mail SMTP server settings
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False

    # Flask-Mail SMTP account settings
    MAIL_USERNAME = '@gmail.com'
    MAIL_PASSWORD = 'password'
    MAIL_DEFAULT_SENDER = '@gmail.com'

    # Flask-User settings
    USER_APP_NAME = "Irwin and Shoichet Laboratories at UCSF"  # Shown in and email templates and page footers
    USER_ENABLE_EMAIL = True  # Enable email authentication
    USER_ENABLE_USERNAME = True  # Disable username authentication
    USER_EMAIL_SENDER_NAME = USER_APP_NAME
    USER_EMAIL_SENDER_EMAIL = "@gmail.com"

    CSRF_ENABLED = True

