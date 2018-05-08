import os
from flask import current_app
from hurry.filesize import size, alternative
from app.data.models.format import FileFormatModel
from werkzeug.utils import secure_filename
from flask_login import current_user
from app.data.models.history import UploadHistoryModel
import pathlib
import sys
import subprocess
from flask import request, jsonify


ALLOWED_EXTENSIONS = set(['bz2', '7z', 'tar', 'gz', 'zip', 'sdf', 'txt', 'smi'])
ALLOWED_EXTENSIONS2 = set(['tsv', 'xls', 'xlsx', 'xlsm'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


def allowed_file2(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS2


def validate(file, form):
    if file and allowed_file(file.filename):
        test=""
        # if file.mimetype.startswith('text/plain'):
        #     formats = FileFormatModel.find_all()
        #     line_number = 0
        #     lines = file.readlines()
        #     if len(lines) == 1:
        #         lines = lines[0].split(b'\r')
        #     for line in lines:
        #         line_number += 1
        #         if line_number > 100:
        #             break
        #         try:
        #             cols = line.decode('windows-1252').strip().split('\t')
        #             if len(cols) >= len(formats):
        #                 for idx, input_format in enumerate(formats):
        #                     obj = str
        #                     if input_format.col_type.lower().startswith("int"):
        #                         obj = int
        #                     elif input_format.col_type.lower().startswith("float"):
        #                         obj = float
        #                     if not isinstance(cols[idx], obj):
        #                         return {'message': "Type error on the line #{}".format(line_number)}, 400
        #             else:
        #                 return {'message': "Columns must be at least {}".format(len(formats))}, 400
        #         except:
        #             return {'message': "Type error on the line #{}".format(line_number)}, 400
    else:
        return {"message": "Invalid file format!"}, 400

    try:
        file.seek(0, os.SEEK_END)
        file_length = file.tell()
        file_size = size(file_length, system=alternative)
        history = UploadHistoryModel(current_user.id, secure_filename(file.filename), file_size)
        history.type = form.type.data
        history.purchasability = form.purchasability.data
        history.natural_products = form.natural_products.data
        history.save_to_db()
        result = save_file(file, history.file_name, False, history.id)
        file_info = "File Uploaded! File Size:{}. ".format(file_size)
        if result is None:
            return {"message": file_info}, 200
        elif result[1] == 200:
            return {"message": file_info + result[0]["message"]}, 200
        else:
            return result
    except:
        print(sys.exc_info())
        return {"message": "An error occured inserting the file."}, 500

    return {"message": "File Uploaded! File Size:{}".format(file_size)}, 200


def check_img_type(file):
    if file.mimetype.startswith('image/jpeg') or file.mimetype.startswith('image/png'):
        return True
    else:
        return False


def save_file(file, name, is_logo, id=""):
    try:
        if is_logo:
            folder = current_app.config['LOGO_UPLOAD_FOLDER']
            name = name.replace(" ", "_") + os.path.splitext(file.filename)[1]
        else:
            user_folder = str(current_user.id) + "_"
            if current_user.short_name:
                user_folder += current_user.short_name
            else:
                user_folder += "vendor"
            user_folder += "/" + str(id) + "/"
            folder = current_app.config['UPLOAD_FOLDER'] + user_folder
        file_dir = os.path.realpath(os.path.dirname(folder))
        pathlib.Path(file_dir).mkdir(parents=True, exist_ok=True)
        file.stream.seek(0)
        print(name)
        print(secure_filename(name))
        file.save(os.path.join(file_dir, secure_filename(name)))
    except:
        print(sys.exc_info())
        return {"message": "1: " + str(sys.exc_info()[0])}, 500

    if is_logo:
        return name
    else:
        str_mandatory_columns = FileFormatModel.find_all_mandatory_column_str()
        str_optional_columns = FileFormatModel.find_all_optional_column_str()
        return run_bash_script(user_folder, str_mandatory_columns, str_optional_columns, id)

    return None


def run_bash_script(user_folder, str_mandatory_columns, str_optional_columns, history_id):
    try:
        print(current_user.get_token())
        print(current_user.company.idnumber)
        if len(current_user.company.idnumber) > 0:
            script_dir = current_app.config['UPLOAD_FOLDER'] + "script/"
            os.chdir(current_app.config['UPLOAD_FOLDER']+user_folder)
            out = subprocess.Popen(["qsub " + script_dir
                                    + 'script.sh {} {} {} {} {} {}'.format(user_folder,
                                                                        current_user.company.idnumber.replace(" ", ","),
                                                                        str_mandatory_columns,
                                                                        str_optional_columns,
                                                                        current_user.get_token(),
                                                                        history_id)
                                    + " > jobID"],
                                   shell=True)
            # print(out.communicate())
            return {"message": "Your job has been submitted!"}, 200
        return {"message": " Please enter your IDNUMBER in the company profile section. "
                           "We need your company IDNUMBER to validate .sdf file. "}, 400
    except AttributeError:
        return {"message": " Please enter your IDNUMBER in the company profile section. "
                           "We need your company IDNUMBER to validate .sdf file. "}, 400
    except:
        print(sys.exc_info())
        return {"message": "1: " + str(sys.exc_info()[0])}, 500


def excel_validation(request):
    dictData = request.get_array(field_name='file', sheet_name='FieldGuide')
    for data in dictData:
        print(data)
