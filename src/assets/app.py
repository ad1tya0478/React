from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import sqlite3
import requests
import os
from dotenv import load_dotenv

# ======================
# CONFIG
# ======================
app = Flask(__name__)
CORS(app)  # allow frontend (React) calls

# ----------------------
# Load Gemini API key safely
# ----------------------
DOTENV_PATH = r"A:\React-Learning\src\assets\gemini.env"  # raw string path
load_dotenv(DOTENV_PATH)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    print("Gemini API key loaded successfully")
else:
    print("Warning: GEMINI_API_KEY not found in .env")
    
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

DB_FILE = "chatbot.db"  # local prototype DB

# ======================
# HELPER FUNCTIONS
# ======================
def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def search_faq(user_message, lang="English"):
    """Search FAQ translations in DB"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT question_text, answer_text 
        FROM faq_translations ft
        JOIN languages l ON ft.language_id = l.language_id
        WHERE l.language_name = ? 
          AND ? LIKE '%' || question_text || '%'
    """, (lang, user_message))
    row = cursor.fetchone()
    conn.close()
    return row["answer_text"] if row else None

def ask_gemini(user_message):
    try:
        headers = {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY
        }
        data = {
            "contents": [
                {
                    "parts": [
                        {"text": f"You are a helpful college assistant. Answer this question in the same language: {user_message}"}
                    ]
                }
            ]
        }
        response = requests.post(GEMINI_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        reply = result["candidates"][0]["content"]["parts"][0]["text"]
        return reply
    except Exception as e:
        return f"Error contacting Gemini API: {str(e)}"


# ======================
# ROUTES
# ======================
@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return jsonify({"message": "Chat endpoint is alive! Use POST to send a message."})
    
    data = request.json
    user_message = data.get("message", "")
    lang = data.get("language", "English")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # 1️⃣ Try DB first
    answer = search_faq(user_message, lang)

    # 2️⃣ Fallback → Gemini
    if not answer:
        answer = ask_gemini(user_message)

    # ✅ Always return JSON with Unicode preserved
    return app.response_class(
        response=json.dumps({"reply": answer}, ensure_ascii=False),
        status=200,
        mimetype="application/json"
    )




@app.route("/test-gemini", methods=["GET"])
def test_gemini():
    import requests
    try:
        headers = {"Content-Type": "application/json", "X-goog-api-key": GEMINI_API_KEY}
        payload = {"contents":[{"parts":[{"text":"Hello Gemini"}]}]}
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        return {"error": str(e)}


@app.route("/faq", methods=["GET"])
def get_faqs():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT l.language_name, ft.question_text, ft.answer_text
        FROM faq_translations ft
        JOIN languages l ON ft.language_id = l.language_id
    """)
    rows = cursor.fetchall()
    conn.close()

    faqs = [
        {"language": row["language_name"], "question": row["question_text"], "answer": row["answer_text"]}
        for row in rows
    ]
    return jsonify(faqs)

# ======================
# MAIN
# ======================
if __name__ == "__main__":
    app.run(debug=True)
