from app import create_app
# from boto.connection import AWSAuthConnection

application = create_app()

if __name__ == '__main__':
    application.debug = True
    application.run()

# app.run(host='0.0.0.0', port=5001, debug=True)
