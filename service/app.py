import numpy as np
import pandas as pd
import base64
import os
import json
import tempfile
import shutil
from io import BytesIO
from PIL import Image  # Import the Image module from Pillow
import traceback
import json
import math
from flask import make_response, jsonify

# Import for images
from IPython import display
from IPython.display import display, Image

# Roboflow
import ultralytics
from ultralytics import YOLO

from flask import Flask, render_template, request, jsonify, make_response, send_file
from flask_cors import CORS

from dynamicGaborFilter import DynamicGaborFilter
from tree_Stats import Tree_Stats
from house_Stats import House_Stats
from person_Stats import Person_Stats
from flask_socketio import SocketIO


app = Flask(__name__)
cors = CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")

# Define the root directory as an absolute path
root_directory = os.path.abspath(os.path.dirname(__file__))

#========== Allowed File extension validations
ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

def is_file_allowed(filename):
    _, ext = os.path.splitext(filename)
    return ext.lower() in ALLOWED_EXTENSIONS

# Function to replace all the NaN values to 0
def replace_nan(obj):
    if isinstance(obj, list):
        return [replace_nan(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: replace_nan(value) for key, value in obj.items()}
    elif isinstance(obj, float) and math.isnan(obj):
        return 0
    else:
        return obj
    
# Function to convert a file to a blob
def file_to_blob(file_path):
    with open(file_path, "rb") as file:
        blob_data = base64.b64encode(file.read()).decode("utf-8")
    return blob_data

# Function to delete the generated images in the web service server
def clearImage(detected_dir, gaborFiltered_dir):
    try:
        # Deleting the uploaded images from the server
        # Check if the given path exists and is a directory (original)
        directory_path = os.path.dirname(detected_dir)
        if os.path.exists(directory_path) and os.path.isdir(directory_path):
            try:
                # Get the directory path (excluding the filename)

                # Use shutil.rmtree to delete the directory and its contents
                shutil.rmtree(directory_path)
                mess = f"Deleted directory: {directory_path}"
                response = make_response(jsonify({'isError': False, 'mess' : mess}))
            except Exception as e:
                response = make_response(jsonify({'isError': True, 'mess' : mess}))
                mess= f"Error deleting directory: {e}"
        else:
            response = make_response(jsonify({'isError': True, 'mess' : mess}))
            mess = f"The provided path is not a valid directory: {detected_dir}"
        
        
        # Check if the given path exists and is a directory (gabor)
        directory_path1 = os.path.dirname(gaborFiltered_dir)
        if os.path.exists(directory_path1) and os.path.isdir(directory_path1):
            try:
                # Get the directory path (excluding the filename)

                # Use shutil.rmtree to delete the directory and its contents
                shutil.rmtree(directory_path1)
                mess = f"Deleted directory: {directory_path1}"
                response = make_response(jsonify({'isError': False, 'mess' : mess}))
            except Exception as e:
                response = make_response(jsonify({'isError': True, 'mess' : mess}))
                mess= f"Error deleting directory: {e}"
        else:
            response = make_response(jsonify({'isError': True, 'mess' : mess}))
            mess = f"The provided path is not a valid directory: {detected_dir}"
        
        return True
    
    except Exception as e:
        # print the full error stack trace
        # print(traceback.print_exc())
        return jsonify({'isError': True, 'error': f'Server error: {e}'}), 500

#========== end 

@app.route('/detection', methods=['POST', 'GET'])
def detection():
    try:
        # =========== File Processing
        #  Validation is there's a file uploaded
        if 'media' not in request.files:
            return jsonify({'isError': True, 'error': 'Error no media input'}), 400
        
        # Getting saving the file as variable
        media_file = request.files['media']
        object = request.form.get('object')
        
        # Extract the name and extension
        filename, extension = os.path.splitext(media_file.filename)

        # File extension validation
        if not is_file_allowed(media_file.filename):
            return jsonify({'isError': True, 'error': 'Invalid file type'}), 400

        # Saving the file as string file path. This will create a temporary filepath
        _, temp_path = tempfile.mkstemp(suffix=extension)
        media_file.save(temp_path)
        media_file = temp_path
        filename = os.path.basename(temp_path)
        
        # =========== end

        # =========== Instantiating the model
        # Load a model
        best_model_path = os.path.join(root_directory, 'models', object, 'weights', 'best.pt')
        model = YOLO(f'{best_model_path}')  # Best Model

        # =========== Detecting the Image 
        # Performed image segmentation
        results = model(source = media_file,
                conf = 0.70,
                save=True,
                show = False
                )
        
        # Getting the directory of detected/annotated image
        predicted_image_dir = os.path.join(results[0].save_dir, filename)

        # =========== Processing the result
        # Json Format
        results_json = results[0].tojson()

        # Parse the JSON string into a Python dictionary
        parsed_json = json.loads(results_json)

        #Getting the confidence rate
        arr_confidence = []
        num_detected_class = len(parsed_json)
        for ind in range(0, num_detected_class):
            arr_confidence.append(parsed_json[ind]['confidence'])
        
        detection_confidence = np.mean(arr_confidence)

        # =========== Execute Dynamic Gabor Filter Utilizing Genetic Algorithm
        # print('Executing Gabor Filter')
        # Initializing where the generated image will be saved
        OUTPUT_PATH = os.path.join(results[0].save_dir, 'gabor')
        
        dynamic_gabor_filter = DynamicGaborFilter(media_file, OUTPUT_PATH, socketio)
        gaborFiltered_dir = dynamic_gabor_filter.generate()

        socketio.emit('loading_percentage', {'percentage': "Calculating the detection confidence..."})
        
        # =========== Get the confidence rate of Gabor version and Compare
        # execute image segmentation detection for dynamic gabor filter version
        # Load a model
        # print('Getting the confidence rate of Gabor version and Compare')
        model1 = YOLO(f'{best_model_path}')  # Best Model
        results_gabor = model1(source = gaborFiltered_dir,
                conf = 0.70,
                save=True,
                show = False
                )
        
        # Getting the directory of detected/annotated image
        predicted_gabor_image_dir = os.path.join(results_gabor[0].save_dir, filename)
        # =========== Processing the result
        # Json Format
        results_gabor_json = results_gabor[0].tojson()

        # Parse the JSON string into a Python dictionary
        parsed_gabor_json = json.loads(results_gabor_json)

        #Getting the confidence rate
        arr_gabor_confidence = []
        num_gabor_detected_class = len(parsed_gabor_json)
        for ind in range(0, num_gabor_detected_class):
            arr_gabor_confidence.append(parsed_gabor_json[ind]['confidence'])
        
        detection_gabor_confidence = np.mean(arr_gabor_confidence)

        # Compare
        # print('Comparing Confidence Results')
        
        if(num_detected_class == num_gabor_detected_class):
            best_results_parsed_json = results_json if (detection_confidence >= detection_gabor_confidence) else results_gabor_json
        elif(num_detected_class > num_gabor_detected_class):
            best_results_parsed_json = results_json
        else:
            best_results_parsed_json = results_gabor_json
        
        socketio.emit('loading_percentage', {'percentage': "Calculating the dimensions..."})
        # =========== Execute Shoelace for Image Statistics
        if(object == 'Tree'):
            # print('Executing Shoelace for Tree')
            tree_shoelace = Tree_Stats(best_results_parsed_json)
            results = tree_shoelace.Stats()
        if(object == 'House'):
            # print('Executing Shoelace for House')
            house_shoelace = House_Stats(best_results_parsed_json)
            results = house_shoelace.Stats()
        if(object == 'Person'):
            # print('Executing Shoelace for Person')
            person_shoelace = Person_Stats(best_results_parsed_json)
            results = person_shoelace.Stats()

        # Formatting the response data and encoding all the generated image to blob type (base 64)
        # print('Returning Response')
        data  = {'isError': False, 
                  'detected_image_dir' : file_to_blob(predicted_image_dir), 
                  'filtered_dir': file_to_blob(gaborFiltered_dir),
                  'detected_filterImage_dir':file_to_blob(predicted_gabor_image_dir),
                  'arr_confidence':arr_confidence,
                  'detection_confidence':detection_confidence,
                  'arr_filtered_confidence':arr_gabor_confidence,
                  'detection_filtered_confidence':detection_gabor_confidence,
                #   'best_results_parsed_json': best_results_parsed_json,
                  'results' : results }
        
        # Replace NaN with 0
        # print('Sanitizing the results, changing the NaN values to 0')
        data_with_zeros = replace_nan(data)

        socketio.emit('loading_percentage', {'percentage': "Finalizing results..."})
        # Convert the dictionary to a JSON-formatted string
        response_data = json.dumps(data_with_zeros)

        # Create a Flask response
        response = make_response(response_data)
        response.headers['X-Custom-Header'] = '*'

        # deleting the generated images to preserve the save space of the server
        # print('deleting the generated images')
        clearImage(predicted_image_dir, predicted_gabor_image_dir)

        # Return the response
        return response
    
    except Exception as e:
        # print the full error stack trace
        print(traceback.print_exc())
        return jsonify({'isError': True, 'error': f'Server error: {e}'}), 500

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    socketio.run(app)
    app.run(port=port, debug=True, threaded = True)