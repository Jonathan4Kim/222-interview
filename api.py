from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample route that returns JSON data dynamically
@app.route('/api/data/<dynamic_part>')
def get_data(dynamic_part):
    # Process the dynamic part
    result = f"Data fornn {dynamic_part}"
    return jsonify(result)


# Another sample route for POSTing data
@app.route('/api/data', methods=['POST'])
def create_data():
    data = request.get_json()  # Receive JSON data from the client
    return jsonify({"message": "Data received successfully", "data": data}), 201


if __name__ == '__main__':
    app.run(debug=True)
