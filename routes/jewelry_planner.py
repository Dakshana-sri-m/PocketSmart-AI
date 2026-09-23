import base64
from flask import Blueprint, request, jsonify, render_template
from services.ai_service import generate_jewelry_recommendations

jewelry_bp = Blueprint("jewelry", __name__)


@jewelry_bp.route("/jewelry")
def jewelry_page():
    return render_template("jewelry_planner.html")


@jewelry_bp.route("/generate-jewelry", methods=["POST"])
def generate_jewelry():
    budget = request.form.get("budget")
    occasion = request.form.get("occasion", "Casual")
    style = request.form.get("style", "Modern")

    if not budget:
        return jsonify({"success": False, "error": "Budget is required"}), 400

    try:
        budget = int(budget)
        if budget <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({"success": False, "error": "Invalid budget value"}), 400

    # Handle optional image upload
    image_b64 = None
    mime_type = "image/jpeg"
    if "outfit_image" in request.files:
        file = request.files["outfit_image"]
        if file and file.filename:
            mime_type = file.mimetype or "image/jpeg"
            image_bytes = file.read()
            image_b64 = base64.b64encode(image_bytes).decode("utf-8")

    outfit_color = request.form.get("outfit_color")
    neckline = request.form.get("neckline")
    metal_preference = request.form.get("metal_preference")
    target_pieces = request.form.get("target_pieces")

    result = generate_jewelry_recommendations(
        budget,
        occasion,
        style,
        outfit_color=outfit_color,
        neckline=neckline,
        metal_preference=metal_preference,
        target_pieces=target_pieces,
        image_b64=image_b64,
        mime_type=mime_type,
    )
    if result["success"]:
        return jsonify(result)
    else:
        return jsonify(result), 500
