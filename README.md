🍔 Cravyo - Food Delivery System

🚀 Cravyo is a full-stack food delivery web application built using HTML, CSS, JavaScript, Python (Flask), and SQLite.

 It allows users to browse food items, manage a cart, and securely authenticate using a backend-powered system.



🌟 Features

🛒 Add to Cart functionality

🔐 User Login & Signup system

🍽️ Browse food items menu

💾 SQLite database integration

⚡ Fast and responsive UI

🔒 Password hashing for security

📡 RESTful API-based backend



🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Python (Flask)

Database: SQLite



📁 Project Structure

Cravyo-Food-Delivery-System/
├── frontend/

│   ├── index.html

│   ├── login.html

│   ├── sign.html

│   ├── food.css

│   ├── food.js

│   └── images/

│

├── backend/

│   ├── app.py

│   ├── routes/

│   └── database/

│       └── database.db

│

├── requirements.txt

└── README.md



🛠️ Backend Implementation

- Built using Flask (Python)
  
- RESTful API architecture for frontend communication
  
- SQLite used as lightweight database
  
- Passwords are securely hashed before storing
  
- Secure authentication system implemented
  
- APIs return JSON responses for frontend integration

  

 📡 API Endpoints

| Method | Endpoint    | Description             |
|--------|-------------|-------------------------|
| GET    | /foods      | Get all food items      |
| POST   | /signup     | Register new user       |
| POST   | /login      | User authentication     |
| POST   | /cart/add   | Add item to cart        |


  
▶️ How to Run Locally

Clone the repository

git clone https://github.com/sidcloudio/Cravyo-Food-Delivery-System.git

Go to project folder

cd Cravyo-Food-Delivery-System

Install dependencies

pip install flask

Run the server

python app.py



## 🌐 Live Demo

🚧 Not deployed yet



📸 Screenshots
🏠 Homepage
![Homepage](frontend/images/homepage.jpeg)



🚀 Future Improvements:

💳 Online payment integration

📱 Mobile responsiveness improvement

🧾 Order history feature

🔔 Real-time order tracking system


🧑‍💻 Author:

👨‍💻 Siddhant Tiwari  
GitHub: @sidcloudio  
Aspiring Full Stack Developer

⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.
