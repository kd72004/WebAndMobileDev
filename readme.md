# Splitwise - Smart Expense Splitting App 💰

Splitwise is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed for seamless group expense management, balance tracking, and efficient debt settlement. It features a modern frontend and a robust backend with advanced algorithms to ensure optimal performance and minimal transactions.

## ✨ Features

* **Group Expense Management:** Create, manage, and track shared expenses within groups.
* **Optimal Settlement Algorithm:** Utilizes a **heap-based algorithm** to calculate the minimum number of transactions required to settle debts among group members.
* **Degree of Connection:** Implements a **Breadth-First Search (BFS)** algorithm to find the connection level between users (friends of friends).
* **Flexible Split Types:** Split expenses equally or customize contributions and shares.
* **Secure Authentication:** User registration and login using **JWT** and secure **bcrypt** password hashing.
* **Responsive UI:** Modern, mobile-friendly interface built with React and Tailwind CSS.
* **AI Expense Advisor:** Provides smart, personalized financial insights and a helpful tip using a third-party API.

---

## 🛠️ Tech Stack

| Component | Technologies Used |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT, bcrypt |
| **Third-party API** | `http://api.adviceslip.com/advice` |

---

## 📂 Repository Structure

The project follows a standard MERN stack architecture with separate directories for the Frontend and Backend, where the Backend adheres to the **Model-View-Controller (MVC)** design pattern.

Splitwise/ ├── backend/ # Node.js/Express Server (MVC Pattern) │ ├── config/ # Database connection and configuration │ ├── controllers/ # Business logic and request handling │ ├── models/ # MongoDB Schemas (Mongoose models for data structure) │ ├── routes/ # Defines API endpoints and links them to controllers │ ├── algorithms/ # Custom algorithms (Settlement, BFS Connection) │ ├── middleware/ # JWT authentication and security checks │ ├── package.json # Backend dependencies │ └── server.js # Server entry point ├── frontend/ # React Application (Client Side) │ ├── public/ # Static assets │ ├── src/ │ │ ├── components/ # Reusable UI elements │ │ ├── pages/ # Main application views (Dashboard, Groups, etc.) │ │ ├── services/ # Logic for making API calls │ │ ├── context/ # Global state management │ │ ├── styles/ # Tailwind CSS and custom styling │ │ └── App.jsx # Application entry and router setup │ ├── package.json # Frontend dependencies │ └── vite.config.js # Build configuration ├── .gitignore # Specifies files/folders to be ignored by Git └── README.md # Project documentation



## 💡 Algorithms Used

The core functionality of Splitwise relies on two key algorithms:

### 1. Optimal Settlement Algorithm (Heap-based)
* **Purpose:** To minimize the total number of transactions required to settle all debts in a group.
* **Mechanism:** Uses a heap data structure to efficiently pair the members who owe the most with the members who are owed the most.

### 2. Degree of Connection (BFS)
* **Purpose:** To visualize social connections and shared memberships among users.
* **Mechanism:** Implements the Breadth-First Search algorithm to determine the shortest "friend-of-a-friend" path between any two users in the network.

---

## 🚀 Main Functionalities

### 1. User Management
* **Registration & Authentication:** Secure sign-up and log-in.
* **Profile Management:** Update personal information, email, and password.

### 2. Group Management
* **Create & Manage Groups:** Set up expense groups with names, descriptions, and member lists.

### 3. Expense Management
* **Add Expenses:** Specify multiple payers and amounts owed.

### 4. Settlement Management
* **Optimal Settlements:** Calculation of minimum required transactions.

---

## 📐 Class Diagram

This diagram outlines the primary models, their attributes, and relationships in the application architecture.
![class diagram](https://github.com/kd72004/WebAndMobileDev/blob/devangi/screensorts/1.png?raw=true)
![class diagram](https://github.com/kd72004/WebAndMobileDev/blob/devangi/screensorts/7.png?raw=true)

****

---

## 💻 Getting Started

### Prerequisites
* Node.js and npm installed
* A running MongoDB instance (local or cloud)

### Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/kd72004/WebAndMobileDev.git](https://github.com/kd72004/WebAndMobileDev.git)
    cd WebAndMobileDev
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Configure your MongoDB connection string in a .env file or configuration file.
    npm start
    ```

3.  **Frontend Setup**
    *In a new terminal:*
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

---

## 🖼️ Screenshots

![project images](https://github.com/kd72004/WebAndMobileDev/blob/devangi/screensorts/2.png?raw=true)
![project images](https://github.com/kd72004/WebAndMobileDev/blob/devangi/screensorts/3.png?raw=true)
![project images](https://github.com/kd72004/WebAndMobileDev/blob/devangi/screensorts/4.png?raw=true)
![project images](https://github.com/kd72004/WebAndMobileDev/blob/devangi/screensorts/5.png?raw=true)
![project images](https://github.com/kd72004/WebAndMobileDev/blob/devangi/screensorts/6.png?raw=true)

## 🔗 Links

| Category | Link |
| :--- | :--- |
| **GitHub Repository** | `https://github.com/kd72004/WebAndMobileDev` |
| **Live Deployment** | `https://split-wise-sepia.vercel.app` |

---

## 🤝 Prepared By

* Devangi Pansuriya - 202412057
* Kalyani Dave - 202412017
