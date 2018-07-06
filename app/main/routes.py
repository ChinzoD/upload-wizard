from flask import render_template, flash, redirect, url_for, current_app, app, request, Response
from flask_user import current_user, roles_required, user_confirmed_email, login_required

from app.data.models.format import FileFormatModel
from app.data.forms.upload_form import UploadForm
from app.data.forms.company_form import CompanyForm
from app.data.models.user import UserModel
from app.data.models.company import CompanyModel
from app.data.models.history import UploadHistoryModel
from app.data.models.job_log import JobLogModel
from flask import request

from app.helpers.validation import validate, check_img_type, save_file, allowed_file2, excel_validation
from app.email import notify_new_user_to_admin, send_password_reset_email
from app.main import application
import os
from flask_menu import Menu, register_menu

from flask import Flask, request, jsonify
import flask_excel as excel

from app.data.forms.reset_form import ResetPasswordRequestForm, ResetPasswordForm
from app import db


@user_confirmed_email.connect_via(application)
def _after_confirmed_hook(sender, user, **extra):
    notify_new_user_to_admin(user)


@application.route('/welcome')
@login_required
@register_menu(application, '.main', 'Home', order=0)
def welcome():
    user = UserModel.find_by_email(current_user.email)
    return render_template('welcome.html', user=user, title='Welcome')


@application.route('/company', methods=['GET', 'POST'])
@login_required
@roles_required('Vendor')
@register_menu(application, '.welcome', 'Company Profile', order=3)
def company():
    form = CompanyForm()
    print(form.validate_on_submit())
    if form.validate_on_submit():
        company_name_duplication = CompanyModel.find_by_name(form.name.data)
        if not form.id.data:
            if company_name_duplication:
                return jsonify({"message": "This company has already registered by other user"}, 400)
            company = CompanyModel(name=form.name.data,
                                   description=form.description.data,
                                   address=form.address.data,
                                   telephone_number=form.telephone_number.data,
                                   toll_free_number=form.toll_free_number.data,
                                   fax_number=form.fax_number.data,
                                   website=form.website.data,
                                   sales_email=form.sales_email.data,
                                   personal_contact_name=form.personal_contact_name.data,
                                   personal_contact_email=form.personal_contact_email.data,
                                   idnumber=form.idnumber.data,
                                   cmpdname=form.cmpdname.data,
                                   cas=form.cas.data,
                                   price=form.price.data,
                                   job_notify_email=form.job_notify_email.data)
            print("64")
            if form.file.data:
                if check_img_type(form.file.data):
                    company.logo = save_file(form.file.data, form.name.data, True)
                    print(company.logo)
                else:
                    print("70")
                    return False
            print("72")
            company.save_to_db()
            print("74")
            user = UserModel.find_by_email(current_user.email)
            user.company_id = company.id
            user.save_to_db()
            print("78")
        else:
            if company_name_duplication and company_name_duplication.id != int(form.id.data):
                return jsonify({"message": "This company has already registered by other user"}, 400)

            company = CompanyModel.find_by_id(int(form.id.data))
            if form.file.data:
                if check_img_type(form.file.data):
                    company.logo = save_file(form.file.data, form.name.data, True)
                else:
                    return False
            company.name = form.name.data
            company.description = form.description.data
            company.address = form.address.data
            company.telephone_number = form.telephone_number.data
            company.toll_free_number = form.toll_free_number.data
            company.fax_number = form.fax_number.data
            company.website = form.website.data
            company.sales_email = form.sales_email.data
            company.personal_contact_name = form.personal_contact_name.data
            company.personal_contact_email = form.personal_contact_email.data
            company.idnumber = form.idnumber.data
            company.cmpdname = form.cmpdname.data
            company.cas = form.cas.data
            company.price = form.price.data
            company.job_notify_email = form.job_notify_email.data
            company.save_to_db()
        flash('Updated!', category='success')
        return jsonify({"message": "Updated!"}, 200)
    elif request.method == 'GET':
        user = UserModel.find_by_email(current_user.email)
        if user.company:
            form.id.data = user.company_id
            form.logo.data = user.company.logo
            form.name.data = user.company.name
            form.description.data = user.company.description
            form.address.data = user.company.address
            form.telephone_number.data = user.company.telephone_number
            form.toll_free_number.data = user.company.toll_free_number
            form.fax_number.data = user.company.fax_number
            form.website.data = user.company.website
            form.sales_email.data = user.company.sales_email
            form.personal_contact_name.data = user.company.personal_contact_name
            form.personal_contact_email.data = user.company.personal_contact_email
            form.idnumber.data = user.company.idnumber
            form.cmpdname.data = user.company.cmpdname
            form.cas.data = user.company.cas
            form.price.data = user.company.price
            form.job_notify_email.data = user.company.job_notify_email
    return render_template('company.html', title='Profile', form=form)


@application.route('/', methods=['GET', 'POST'])
@application.route('/index', methods=['GET', 'POST'])
def index():
    if current_user.is_authenticated:
        if current_user.has_role('Admin'):
            return redirect(url_for('admin.index'))
        else:
            return redirect(url_for('main.welcome'))
    else:
        return redirect(url_for('user.login'))


@application.route('/help')
@login_required
@register_menu(application, '.fourth', 'Help', order=4)
def help_page():
    return render_template('help.html', title='Help')


@application.route('/history', methods=['GET', 'POST'])
@login_required
@roles_required('Vendor')
@register_menu(application, '.first', 'History', order=1)
def history():
    page = request.args.get('page', 1, type=int)
    histories = current_user.upload_histories.paginate(
        page, current_app.config['LISTS_PER_PAGE'], False)
    next_url = url_for('main.history', page=histories.next_num) \
        if histories.has_next else None
    prev_url = url_for('main.history', page=histories.prev_num) \
        if histories.has_prev else None
    pagestart = (page-1)*current_app.config['LISTS_PER_PAGE']
    return render_template('history.html', title='Home Page', histories=histories.items,
                           next_url=next_url,
                           prev_url=prev_url,
                           pagestart=pagestart)


@application.route('/last_result', methods=['GET', 'POST'])
@login_required
def last_result():
    history = UploadHistoryModel.get_last_by_user_id(current_user.id)
    return render_template('result.html', title='Job Result', history=history)


@application.route('/result', methods=['GET', 'POST'])
@login_required
def result():
    id = request.args.get('id', type=int)
    history = UploadHistoryModel.find_by_id(id)
    if history.user.id != current_user.id:
        return render_template('errors/404.html'), 404
    # stdout = ""
    # stderr = ""
    # base_folder = current_app.config['UPLOAD_FOLDER']
    # folder = "{}/{}_vendor/{}/".format(base_folder, current_user.id, id)
    # if not os.path.exists(os.path.realpath(os.path.dirname(folder))):
    #     folder = "{}/{}_{}/{}/".format(base_folder, current_user.id, current_user.short_name, id)
    # file_dir = os.path.realpath(os.path.dirname(folder))
    # print(file_dir)
    # print(os.path.join(file_dir, "stdout"))
    # if os.path.isfile(os.path.join(file_dir, "stdout")):
    #     with open(os.path.join(file_dir, "stdout"), 'r') as file1:
    #         stdout = file1.read()
    #         file1.close()
    #     with open(os.path.join(file_dir, "stderr"), 'r') as file2:
    #         stderr = file2.read()
    #         stderr = stderr.replace("%", "")
    #         stderr = stderr.replace('\n', "<br/>")
    #         file2.close()

    return render_template('result.html', title='Job Result', history=history)
    # return render_template('result.html', title='Job Result', history=history, stdout=stdout, stderr=stderr)


@application.route('/job_logs', methods=['GET'])
@login_required
def job_logs():
    history_id = request.args.get('history_id', type=int)
    id = request.args.get('id', type=int)
    job_logs = JobLogModel.find_by_history(history_id, id)
    return jsonify([{
        'id': l.id,
        'status': l.status,
        'status_type': l.status_type,
        'date': l.date
    } for l in job_logs])


@application.route('/upload', methods=['GET', 'POST'])
@login_required
@roles_required('Vendor')
@register_menu(application, '.second', 'File Upload', order=2)
def upload():
    if current_app.config['ZINC_MODE']:
        form = UploadForm()
        formats = FileFormatModel.find_all()
        if request.method == 'POST' and form.validate_on_submit():
            return_msg = validate(form.file.data, form)
            return jsonify(return_msg)
        # else:
        #     # return_msg = validate(form)
        #     return jsonify(return_msg)
        return render_template('upload.html', title='Upload File', form=form, formats=formats)
    else:
        if request.method == 'POST':
            return jsonify(excel_validation(request))
        return render_template('upload.html', title='Upload File')


@application.route('/histories', methods=['GET', 'POST'])
@login_required
@roles_required('Vendor')
def get_histories():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    data = UploadHistoryModel.to_all_collection_dict(
        UploadHistoryModel.query.filter_by(user_id=current_user.id).order_by(
            UploadHistoryModel.id.desc()), page, per_page, 'ID')
    return jsonify(data)


@application.route("/export/<history_id>", methods=['GET'])
def export(history_id):
    history = UploadHistoryModel.find_by_id(history_id)
    return excel.make_response_from_array(eval(history.data_array), 'xlsx',
                                          file_name="export_raw_data_{}".format(history_id))


@application.route('/reset_password_request', methods=['POST'])
def reset_password_request():
    if current_user.is_authenticated:
        # return redirect(url_for('main.welcome'))
        pass
    form = ResetPasswordRequestForm()
    print(form.validate_on_submit())
    if form.validate_on_submit():
        user = UserModel.query.filter_by(email=form.email.data).first()
        print("email3")
        if user:
            print("email4")
            send_password_reset_email(user)
        flash('Check your email for the instructions to reset your password')
        return redirect(url_for('user.login'))
    return render_template('reset_password_request.html',
                           title='Reset Password', form=form)


@application.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if current_user.is_authenticated:
        print("autehnticated")
        return redirect(url_for('main.welcome'))
    user = UserModel.verify_reset_password_token(token)
    if not user:
        print("not user")
        return redirect(url_for('user.login'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        flash('Your password has been reset.')
        return redirect(url_for('user.login'))
    return render_template('reset_password.html', form=form)


# @application.route("/export/<history_id>/<type>", methods=['GET'])
# def export(history_id, type):
#     if str(type).startswith('raw'):
#         history = UploadHistoryModel.find_by_id(history_id)
#         return excel.make_response_from_array(eval(history.data_array), 'xlsx',
#                                               file_name="export_raw_data_{}".format(history_id))
#
#     if not str(type).lower() in ['xls', 'xlsx', 'csv', 'tsv']:
#         return render_template('errors/404.html'), 404
#
#     catalogs = CatalogModel.find_by_history_id(history_id)
#     # try:
#     #     attr_count = [c.field_name for c in catalogs].index(catalogs[0].field_name, 1)
#     # except ValueError:
#     #     attr_count = len(catalogs)
#
#     attr_count = len(set(c.field_name for c in catalogs))
#     title = [c.field_name for c in catalogs[:attr_count]]
#     data = [c.value for c in catalogs]
#     values = [data[i:i + attr_count] for i in range(0, len(data), attr_count)]
#     values.insert(0, title)
#     print(values)
#     return excel.make_response_from_array(values, str(type).lower(),
#                                           file_name="export_data_{}".format(history_id))
    # return excel.make_response_from_array(
    #     values, 'handsontable.html')
    # title.append(catalogs[0].field_name)
    # for catalog in catalogs[1:]:
    #     if catalogs[0].field_name == catalog.field_name:
    #         break
    #     title.append(catalog.field_name)
    # print(title)
    # print(len(title))
    # res = []
    # res.append(title)
    # val = []
    # for index, item in enumerate(catalogs):
    #     val.append(item.value)
    #     # print(str(index) + ":"+str(index % (len(title)-1)))
    #     if index % (len(title)-1) == 0 and index >= (len(title)-1):
    #         res.append(val)
    #         val = []
    #         # print("hiii")
    # return excel.make_response_from_array(res, "csv",
    #                                       file_name="export_data")


# @app.errorhandler(InvalidUsage)
# def handle_invalid_usage(error):
#     response = jsonify(error.to_dict())
#     response.status_code = error.status_code
#     return response
