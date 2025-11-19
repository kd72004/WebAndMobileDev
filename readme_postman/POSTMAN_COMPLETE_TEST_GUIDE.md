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
```

---

## 📋 TEST 9: OpenAI Expense Analysis (Requires Auth) ⭐ MAIN TEST

**Purpose:** Get AI-powered expense insights

### Request Details:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/openai/analyze`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (raw JSON):**
  ```json
  {}
  ```
  (Empty body - backend fetches expenses automatically)

### Expected Response (Success):
```json
Status: 200 OK
{
  "text": "Based on your expense data, here are some insights:\n\n1. You've spent ₹500 total across 1 transaction...\n\n2. Your top spending category is Food...\n\n3. Recommendation: Consider setting a monthly budget...\n\n4. Keep tracking your expenses regularly!"
}
```

### Expected Response (No Expenses):
```json
Status: 200 OK
{
  "text": "Add some expenses to your groups to get personalized AI insights!"
}
```

### Expected Response (No API Key):
```json
Status: 200 OK
{
  "text": "OpenAI API key is not configured. Please add OPENAI_API_KEY to your backend .env file.\n\nHere are some general financial tips:\n\n• Track your expenses regularly..."
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

## 📋 TEST 10: Error Test - Invalid Token

**Purpose:** Verify authentication is working

### Request Details:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/openai/analyze`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer invalid_token_12345
  ```
- **Body (raw JSON):**
  ```json
  {}
  ```

### Expected Response:
```json
Status: 401 Unauthorized
{
  "error": "Unauthorized"
}
```

---

## 🎯 Quick Test Checklist (20 Minutes)

### Step 1: Setup (2 min)
- [ ] Start backend server
- [ ] Test health endpoint (Test 1)
- [ ] Open Postman

### Step 2: Authentication (3 min)
- [ ] Register user (Test 2) OR Login (Test 3)
- [ ] Copy token
- [ ] Test profile (Test 4)

### Step 3: Create Data (5 min)
- [ ] Create group (Test 5)
- [ ] Copy group ID
- [ ] Create expense (Test 7)
- [ ] Get expenses (Test 8)

### Step 4: Test OpenAI (5 min)
- [ ] Test OpenAI analysis (Test 9) ⭐
- [ ] Verify response has insights
- [ ] Test error case (Test 10)

### Step 5: Verify (5 min)
- [ ] Check all responses are correct
- [ ] Verify OpenAI insights are personalized
- [ ] Test with different scenarios

---

## 🔧 Code Changes Needed

### ✅ Already Done:
- ✅ Backend route created: `backend/routes/openaiRoutes.js`
- ✅ Route registered: `backend/index.js` (line 35)
- ✅ Frontend updated to use OpenAI

### ⚠️ You Need to Do:

1. **Add OpenAI API Key to Backend:**
   - Open `backend/.env` file
   - Add this line:
     ```env
     OPENAI_API_KEY=sk-your-openai-api-key-here
     ```
   - Get key from: https://platform.openai.com/api-keys

2. **Restart Backend Server:**
   ```bash
   # Stop server (Ctrl+C)
   # Then start again:
   cd backend
   npm start
   ```

3. **Optional - Install node-fetch (if Node < 18):**
   ```bash
   cd backend
   npm install node-fetch@2
   ```
   (Only needed if you get "fetch is not defined" error)

---

## 🐛 Troubleshooting

### Problem: "401 Unauthorized"
**Solution:** 
- Make sure you copied the token correctly
- Token should start with `eyJ...`
- Include `Bearer ` before token (with space)

### Problem: "OpenAI API key not configured"
**Solution:**
- Add `OPENAI_API_KEY` to `backend/.env`
- Restart backend server
- Check key starts with `sk-`

### Problem: "No expenses found"
**Solution:**
- This is normal if user has no expenses
- Create expenses first (Test 7)
- Then test OpenAI analysis again

### Problem: "Network Error" or "Could not connect"
**Solution:**
- Check backend is running: `http://localhost:5000/health`
- Verify URL is correct
- Check backend console for errors

### Problem: "fetch is not defined"
**Solution:**
- Install node-fetch: `npm install node-fetch@2`
- Or upgrade Node.js to version 18+

---

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
    },
    {
      "name": "9. OpenAI Analysis ⭐",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer YOUR_TOKEN_HERE",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{}"
        },
        "url": {
          "raw": "http://localhost:5000/api/openai/analyze",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "openai", "analyze"]
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


