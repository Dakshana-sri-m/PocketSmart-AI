from flask import Blueprint, request, jsonify, render_template
from services.ai_service import generate_party_recommendations

party_bp = Blueprint("party", __name__)


@party_bp.route("/party")
def party_page():
    return render_template("party_planner.html")


@party_bp.route("/generate-party", methods=["POST"])
def generate_party():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "error": "No data provided"}), 400

    budget = data.get("budget")
    guests = data.get("guests")
    event_type = data.get("event_type", "Birthday")
    venue = data.get("venue", "Indoor Hall")

    if not budget or not guests:
        return jsonify({"success": False, "error": "Budget and guest count are required"}), 400

    try:
        budget = int(budget)
        guests = int(guests)
        if budget <= 0 or guests <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({"success": False, "error": "Invalid budget or guest count"}), 400

    dietary = data.get("dietary")
    entertainment_vibe = data.get("entertainment_vibe")
    bar_setup = data.get("bar_setup")
    special_elements = data.get("special_elements")

    result = generate_party_recommendations(
        budget,
        guests,
        event_type,
        venue,
        dietary=dietary,
        entertainment_vibe=entertainment_vibe,
        bar_setup=bar_setup,
        special_elements=special_elements,
    )
    if result["success"]:
        return jsonify(result)
    else:
        return jsonify(result), 500
