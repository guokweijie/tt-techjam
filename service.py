from logging.handlers import RotatingFileHandler
from typing import List

from flask import Flask, request, jsonify
from werkzeug.datastructures import FileStorage

from manager import Manager

app = Flask(__name__)

LOG_FILE = 'tttj_service.log'

manager = Manager()
handler = RotatingFileHandler(LOG_FILE, maxBytes=100000, backupCount=1)
app.logger.addHandler(handler)
app.logger.setLevel('INFO')


@app.before_request
def before_request_logging():
    app.logger.info(f"Request: {request.method} {request.path} from {request.remote_addr}")


@app.after_request
def after_request_logging(response):
    app.logger.info(f"Response: {response.status_code} for {request.method} {request.path} from {request.remote_addr}")
    return response


@app.route('/upload_images', methods=['POST'])
def upload_images():
    if 'images' not in request.files:
        return jsonify({"error": "No images part in the request"}), 400

    images: List[FileStorage] = request.files.getlist('images')

    indices = manager.sortImages(images)

    return jsonify({"indices": indices})


if __name__ == '__main__':
    app.run(debug=True)
