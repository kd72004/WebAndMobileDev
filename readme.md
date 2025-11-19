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
![project images](D:\splitwise2__\splitwise2__\screensorts\1.png)
D:\splitwise2__\splitwise2__\screensorts\1.png
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

![project images](\screensorts\2.png)
![project images](D:\splitwise2__\splitwise2__\screensorts\3.png)
![project images](D:\splitwise2__\splitwise2__\screensorts\4.png)
![project images](D:\splitwise2__\splitwise2__\screensorts\5.png)
![project images](D:\splitwise2__\splitwise2__\screensorts\6.png)
![project images](D:\splitwise2__\splitwise2__\screensorts\7.png)
## 🔗 Links

| Category | Link |
| :--- | :--- |
| **GitHub Repository** | `https://github.com/kd72004/WebAndMobileDev` |
| **Live Deployment** | `https://split-wise-sepia.vercel.app` |

---

## 🤝 Prepared By

* Devangi Pansuriya - 202412057
* Kalyani Dave - 202412017
