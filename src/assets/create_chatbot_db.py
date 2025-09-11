import sqlite3

DB_FILE = "chatbot.db"

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# -----------------------
# 1. Create tables
# -----------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS languages (
    language_id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_name TEXT UNIQUE NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS faq_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_id INTEGER,
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    FOREIGN KEY(language_id) REFERENCES languages(language_id)
)
""")

# -----------------------
# 2. Insert languages
# -----------------------
languages = ["English", "Hindi"]
for lang in languages:
    cursor.execute("INSERT OR IGNORE INTO languages (language_name) VALUES (?)", (lang,))

# -----------------------
# 3. Insert sample FAQs
# -----------------------

# English FAQs
cursor.execute("""
INSERT OR IGNORE INTO faq_translations (language_id, question_text, answer_text)
VALUES (
    (SELECT language_id FROM languages WHERE language_name='English'),
    'When is the fee deadline?',
    'The fee deadline is September 30th.'
)
""")

cursor.execute("""
INSERT OR IGNORE INTO faq_translations (language_id, question_text, answer_text)
VALUES (
    (SELECT language_id FROM languages WHERE language_name='English'),
    'How do I apply for a scholarship?',
    'You can apply through the scholarships section on the college website.'
)
""")

# Hindi FAQs
cursor.execute("""
INSERT OR IGNORE INTO faq_translations (language_id, question_text, answer_text)
VALUES (
    (SELECT language_id FROM languages WHERE language_name='Hindi'),
    'फीस की अंतिम तिथि कब है?',
    'फीस जमा करने की अंतिम तिथि 30 सितंबर है।'
)
""")

cursor.execute("""
INSERT OR IGNORE INTO faq_translations (language_id, question_text, answer_text)
VALUES (
    (SELECT language_id FROM languages WHERE language_name='Hindi'),
    'छात्रवृत्ति के लिए आवेदन कैसे करें?',
    'आप कॉलेज की वेबसाइट पर छात्रवृत्ति सेक्शन के माध्यम से आवेदन कर सकते हैं।'
)
""")

# -----------------------
# 4. Commit & close
# -----------------------
conn.commit()
conn.close()

print(f"{DB_FILE} is ready with tables and sample data!")
