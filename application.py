from app import create_app

application = create_app()
application.app_context().push()

if __name__ == '__main__':
    application.debug = True
    application.run()

# app.run(host='0.0.0.0', port=5001, debug=True)
