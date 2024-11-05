from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from image_urls import image_urls

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


with open('data.json', 'r') as file:
    data = json.load(file)


inner_list = data[0]['members']

temp = {}

for member in inner_list:
    temp[member['name']] = member
data = temp


# Sample route that returns JSON data dynamically
@app.route('/api/data/<first_name>/<last_name>', methods=["GET"])
def get_data(first_name, last_name):
    # Process the dynamic part
    name = first_name + " " + last_name
    return jsonify(data[name])


# Another sample route for POSTing data
@app.route('/api/image_urls', methods=['GET'])
def create_data():
    # get image urls
    return jsonify(image_urls)


if __name__ == '__main__':
    app.run(debug=True)
