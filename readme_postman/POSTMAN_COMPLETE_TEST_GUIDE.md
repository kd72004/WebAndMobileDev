# 🚀 Complete Postman Test Guide - Ready to Use in 20 Minutes

## ⚡ Quick Setup (Do This First!)

1. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```

2. **Verify Server is Running:**
   - Open browser: `http://localhost:5000/health`
   - Should see: `"Server is running"`

3. **Open Postman** and follow tests below in order

---

## 📋 TEST 1: Health Check (No Auth Required)

**Purpose:** Verify server is running

### Request Details:
- **Method:** `GET`
- **URL:** `http://localhost:5000/health`
- **Headers:** None needed
- **Body:** None

### Expected Response:
```
Status: 200 OK
Response: "Server is running"
```

---

## 📋 TEST 2: User Registration

**Purpose:** Create a new user account

### Request Details:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/users/register`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Expected Response:
```json
Status: 201 Created
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**⚠️ IMPORTANT:** Copy the `token` value! You'll need it for other tests.

---

## 📋 TEST 3: User Login

**Purpose:** Login and get authentication token

### Request Details:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/users/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Expected Response:
```json
Status: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**⚠️ IMPORTANT:** Copy the `token` value! Use this for all authenticated requests.

---

## 📋 TEST 4: Get User Profile (Requires Auth)

**Purpose:** Get current user's profile information

### Request Details:
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/users/me`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
  (Replace `YOUR_TOKEN_HERE` with token from Test 2 or 3)

- **Body:** None

### Expected Response:
```json
Status: 200 OK
{
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "createdAt": "..."
}
```

### Error Response (No Token):
```json
Status: 401 Unauthorized
{
  "error": "Unauthorized"
}
```

---

## 📋 TEST 5: Create Group (Requires Auth)

**Purpose:** Create a new expense group

### Request Details:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/groups`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Test Group",
    "description": "Testing group creation"
  }
  ```
  
  **Note:** `userId` is automatically taken from your auth token - no need to send it!

### Expected Response:
```json
Status: 201 Created
{
  "_id": "...",
  "name": "Test Group",
  "description": "Testing group creation",
  "createdBy": "...",
  "createdAt": "..."
}
```

**⚠️ IMPORTANT:** Copy the `_id` (groupId) - you'll need it for expense tests!

---

## 📋 TEST 6: Get All Groups (Requires Auth)

**Purpose:** Get all groups user is part of

### Request Details:
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/groups`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body:** None

### Expected Response:
```json
Status: 200 OK
[
  {
    "_id": "...",
    "name": "Test Group",
    "description": "Testing group creation",
    "createdBy": "..."
  }
]
```

---

## 📋 TEST 7: Create Expense (Requires Auth)

**Purpose:** Add a new expense to a group

### Request Details:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/expenses`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (raw JSON):**
  ```json
  {
    "groupId": "YOUR_GROUP_ID_HERE",
    "description": "Team Lunch",
    "amount": 500,
    "paidBy": [
      {
        "userId": "YOUR_USER_ID_HERE",
        "amount": 500
      }
    ],
    "splitMember": [
      {
        "userId": "YOUR_USER_ID_HERE",
        "amount": 250
      },
      {
        "userId": "ANOTHER_USER_ID",
        "amount": 250
      }
    ],
    "splitType": "equally",
    "date": "2024-01-15T10:00:00.000Z"
  }
  ```

**⚠️ Replace:**
- `YOUR_GROUP_ID_HERE` - from Test 5 response
- `YOUR_USER_ID_HERE` - from Test 4 response
- `ANOTHER_USER_ID` - another user in the group (or same user for testing)

### Expected Response:
```json
Status: 201 Created
{
  "_id": "...",
  "groupId": "...",
  "description": "Team Lunch",
  "amount": 500,
  "paidBy": [...],
  "splitMember": [...],
  "createdAt": "..."
}
```

---

## 📋 TEST 8: Get Expenses by Group (Requires Auth)

**Purpose:** Get all expenses for a specific group

### Request Details:
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/expenses/group/YOUR_GROUP_ID_HERE`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body:** None

**⚠️ Replace:** `YOUR_GROUP_ID_HERE` with group ID from Test 5

### Expected Response:
```json
Status: 200 OK
[
  {
    "_id": "...",
    "groupId": "...",
    "description": "Team Lunch",
    "amount": 500,
    "paidBy": [...],
    "splitMember": [...],
    "createdAt": "..."
  }
]




## 📝 Postman Collection JSON (Import This!)

Save this as `Splitwise_API_Collection.json` and import into Postman:

```json
{
  "info": {
    "name": "Splitwise API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "1. Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["health"]
        }
      }
    },
    {
      "name": "2. Register User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/users/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "users", "register"]
        }
      }
    },
    {
      "name": "3. Login User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/users/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "users", "login"]
        }
      }
    },
    {
      "name": "4. Get Profile",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer YOUR_TOKEN_HERE",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:5000/api/users/me",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "users", "me"]
        }
      }
    }
  ]
}
```

---

## ✅ Success Criteria

Your tests are successful if:
- ✅ Health check returns "Server is running"
- ✅ Registration/Login returns token
- ✅ Profile returns user data
- ✅ OpenAI analysis returns personalized insights
- ✅ Error cases return proper error messages


