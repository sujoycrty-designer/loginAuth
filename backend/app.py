from flask import Flask, request, jsonify
from flask_cors import CORS

from backend.users import check_credentials

app = Flask(__name__)
CORS(app)


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "")
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required."}), 400

    if check_credentials(username, password):
        return jsonify({"success": True, "message": f"Welcome, {username}!"}), 200

    return jsonify({"success": False, "message": "Invalid username or password."}), 401


if __name__ == "__main__":
    app.run(debug=True, port=5000)
