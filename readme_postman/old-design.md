# Splitwise - Smart Expense Splitting App

Splitwise is a full-stack expense sharing application that allows users to manage group expenses, track balances, and settle up efficiently. It features a modern frontend and a robust backend with advanced algorithms, providing a seamless experience for splitting expenses among friends and groups.

---

## Features

- **Group Expense Management:** Create groups, add members, and track shared expenses.  
- **Optimal Settlement Algorithm:** Uses a heap-based algorithm to minimize the number of transactions required to settle debts among group members.  
- **Degree of Connection:** Find the degree of connection between users (friends of friends) using BFS.  
- **User Authentication:** Secure login and signup functionality.  
- **Responsive UI:** Modern, user-friendly interface for desktop and mobile.

---

## Main Functionalities

### 1. User Management
- **Registration & Authentication:** Users can sign up, log in, and manage profiles securely.  
- **Profile Management:** Users can update personal info like name, email, and password.

### 2. Group Management
- **Create & Manage Groups:** Users can create expense groups, assign names and descriptions, and manage members.  
- **Add/Remove Members:** Admins can add or remove members for accurate expense tracking.

### 3. Expense Management
- **Add Expenses:** Users can add expenses within groups specifying multiple payers.  
- **Flexible Split Types:** Expenses can be split equally or customized by contribution.  
- **Expense History:** Detailed history of all group expenses including date, split type, and payer info.

### 4. Settlement Management
- **Optimal Settlements:** Uses a heap-based algorithm to calculate minimum transactions required to settle debts.  
- **Track Settlements:** View pending and completed settlements within a group.

### 5. Social & Connection Features
- **Degree of Connection:** BFS algorithm to show how closely users are connected.  
- **Mutual Friends & Shared Groups:** Visualize relationships and shared memberships.

### 6. Dashboard & Analytics
- **Visual Overview:** Displays total expenses, member counts, and summaries per group.  
- **Expense Summaries:** Quick insight into each member’s spending and owed amounts.

### 7. Security & Performance
- **JWT Authentication:** Secure API access.  
- **Password Hashing:** Uses bcrypt for secure password storage.  
- **Optimized Performance:** Supports large groups and concurrent users efficiently.

### 8. Responsive Frontend
- Mobile-friendly UI using React and Tailwind CSS.  
- Smooth navigation between groups, expenses, and settlements.

---

## Algorithms Used

1. **Split Algorithm (Heap-based Settlement):** Optimizes the settlement process to minimize the number of transactions in a group.  
2. **Degree of Connection (BFS):** Determines user connections (friends of friends) across the network.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Third-party API:** [api.adviceslip.com/advice](https://api.adviceslip.com/advice)

---

## Getting Started

### Prerequisites
- Node.js and npm installed

### Backend Setup
```bash
cd backend
npm install
# Configure your database in backend/config/db.js
npm start

### Backend Setup
```bash
cd frontend
npm install
npm run dev
