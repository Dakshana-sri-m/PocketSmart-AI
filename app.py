import os
from flask import Flask, render_template
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "pocketsmart-dev-secret-2024")

# Register Blueprints
from routes.home_planner import home_bp
from routes.party_planner import party_bp
from routes.jewelry_planner import jewelry_bp

app.register_blueprint(home_bp)
app.register_blueprint(party_bp)
app.register_blueprint(jewelry_bp)


@app.route("/")
def index():
    return render_template("index.html")


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html"), 404


if __name__ == "__main__":
    print("PocketSmart AI starting at http://localhost:5000")
    app.run(debug=True, port=5000)
