from flask import Flask, request, jsonify
import requests, os
from dotenv import load_dotenv

load_dotenv()  # loads GEMINI_API_KEY from .env
app = Flask(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY
    }
    data = {
        "contents": [
            {
                "parts": [{"text": user_input}]
            }
        ]
    }
    response = requests.post(GEMINI_URL, headers=headers, json=data)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
