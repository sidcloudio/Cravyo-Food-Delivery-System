from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

# 🔐 Password hashing ke liye
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # 🌐 frontend ko backend access dene ke liye

# 🗄️ DATABASE CREATE FUNCTION
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 👤 USERS TABLE
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            password TEXT
        )
    ''')

    # 🛒 CART TABLE (NEW)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            item_name TEXT,
            quantity INTEGER
        )
    ''')

    conn.commit()
    conn.close()

# 👉 DB initialize
init_db()

# 🏠 HOME ROUTE
@app.route('/')
def home():
    return "Backend Running 🚀"

# 📝 SIGNUP API
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        # 🔐 Password ko hash kar rahe hai (secure)
        hashed_password = generate_password_hash(data['password'])

        # 👇 Data DB me insert
        cursor.execute('''
            INSERT INTO users (first_name, last_name, email, phone, password)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data['first_name'],
            data['last_name'],
            data['email'],
            data['phone'],
            hashed_password   # ❗ plain password nahi, hashed save ho raha hai
        ))

        conn.commit()
        return jsonify({"message": "User created successfully"}), 201

    except:
        return jsonify({"error": "User already exists"}), 400

    finally:
        conn.close()


# 🔐 LOGIN API
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 👇 Email se user find karo
    cursor.execute("SELECT * FROM users WHERE email=?", (data['email'],))
    user = cursor.fetchone()
    conn.close()

    # 🔐 Password hash compare
    if user and check_password_hash(user[5], data['password']):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


# 🛒 ADD TO CART API
@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():
    data = request.json

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 👇 Cart me item add karo
    cursor.execute('''
        INSERT INTO cart (user_id, item_name, quantity)
        VALUES (?, ?, ?)
    ''', (
        data['user_id'],
        data['item_name'],
        data['quantity']
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Item added to cart"})


# 🛒 GET CART DATA
@app.route('/cart/<int:user_id>')
def get_cart(user_id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 👇 User ke cart items fetch karo
    items = cursor.execute('''
        SELECT item_name, quantity FROM cart WHERE user_id=?
    ''', (user_id,)).fetchall()

    conn.close()

    return jsonify(items)


# 🚀 SERVER RUN (HAMESHA LAST)
if __name__ == '__main__':
    app.run(debug=True)
