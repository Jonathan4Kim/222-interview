from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample route that returns JSON data dynamically
@app.route('/api/data/<string:item_id>', methods=['GET'])
def get_data(item_id):
    # Mock data - you could dynamically pull from a database or an external API here
    data = {
        "item_id": item_id,
        "name": f"Item {item_id}",
        "description": "This is a dynamically generated item.",
        "price": 10.99
    }
    return jsonify(data)


# Another sample route for POSTing data
@app.route('/api/data', methods=['POST'])
def create_data():
    data = request.get_json()  # Receive JSON data from the client
    return jsonify({"message": "Data received successfully", "data": data}), 201


if __name__ == '__main__':
    app.run(debug=True)
