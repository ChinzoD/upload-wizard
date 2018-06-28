from app import create_app
from flask import render_template
# BEGIN CELERY
from celery import Celery


def make_celery(application):
    # celery = Celery(application.import_name, broker=application.config['CELERY_BROKER_URL'])
    celery = Celery(application.import_name, broker=application.config['CELERY_BROKER_URL'])
    celery.conf.update(application.config)
    celery.conf.broker_transport_options = {'region': 'us-west-1'}
    TaskBase = celery.Task
    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with application.app_context():
                return TaskBase.__call__(self, *args, **kwargs)
    celery.Task = ContextTask
    return celery
# DONE CELERY

application = create_app()

celery = make_celery(application)


@application.route('/test', methods=['GET', 'POST'])
def take_test():
    print("test1")
    get_location.delay("")
    print("test2")
    return render_template('test.html')

#Celery Task
# It is possible to set the SQS name as @celery.task(name='tasks.get_location', queue="flask-es")
# Whitout the queue declaration, it will create sqs named "celery"
# @celery.task(name='tasks.get_location', queue="awseb-e-mzqpb2udt4-stack-AWSEBWorkerQueue-PJ32Q5KXV820")
@celery.task(name='tasks.get_location')
def get_location(user):
        # Get the location from the API
        print("hi from celery")
        from app.data.models.catalog import CatalogModel
        catalog = CatalogModel('celery', 'celery', 'celery', 47)
        catalog.save_to_db()
        return
#End Task

if __name__ == '__main__':
    application.debug = True
    application.run()

# app.run(host='0.0.0.0', port=5001, debug=True)
