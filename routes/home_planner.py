from flask import Blueprint, request, jsonify, render_template
from services.ai_service import generate_home_recommendations

home_bp = Blueprint("home", __name__)


@home_bp.route("/home")
def home_page():
    return render_template("home_planner.html")


@home_bp.route("/generate-home", methods=["POST"])
def generate_home():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "error": "No data provided"}), 400

    budget = data.get("budget")
    rooms = data.get("rooms", [])

    if not budget or not rooms:
        return jsonify({"success": False, "error": "Budget and at least one room are required"}), 400

    try:
        budget = int(budget)
        if budget <= 0:
            raise ValueError("Budget must be positive")
    except (ValueError, TypeError):
        return jsonify({"success": False, "error": "Invalid budget value"}), 400

    result = generate_home_recommendations(budget, rooms)
    if result["success"]:
        return jsonify(result)
    else:
        return jsonify(result), 500
