# 📦 NITRMart API Documentation

Backend API for NITRMart, a platform for students to buy and sell items securely.


# User Management API

This API allows users to register, login, and manage their profiles securely using JWT authentication.

---
## 🌐 Base URL
```
http://127.0.0.1:8000/
```
---

## 🔐 Authentication

All endpoints (except registration and login) require **JWT authentication**.

### Example Header:

```

Authorization: Bearer \<your\_access\_token>

````

---

## 👤 User Management Endpoints

### 1. 🚀 Register a New User

- **Endpoint:** `/users/`
- **Method:** `POST`
- **Permissions:** `AllowAny`
- **Description:** Registers a new user with an `@nitrkl.ac.in` email.

#### ✅ Request Body:

```json
{
  "email": "user@nitrkl.ac.in",
  "password": "your_password",
  "first_name": "John",
  "last_name": "Doe",
  "year": "2nd",
  "branch": "Biotechnology",
  "roll_no": "123456",
  "phone_number": "1234567890",
  "bio": "Short bio",
  "profile_picture": "<file>"
}
````

#### 📤 Response (201 Created):

```json
{
  "email": "user@nitrkl.ac.in",
  "first_name": "John",
  "last_name": "Doe",
  "year": "2nd",
  "branch": "Biotechnology",
  "roll_no": "123456",
  "phone_number": "1234567890",
  "bio": "Short bio",
  "profile_picture": "http://127.0.0.1:8000/media/profile_pictures/user.jpg"
}
```

#### ❌ Error Responses:

```json
// Invalid Email
{
  "email": "Only @nitrkl.ac.in email addresses are allowed."
}

// Missing Fields
{
  "email": ["This field is required."],
  "first_name": ["This field is required."]
}
```

---

### 2. 🔑 Login

* **Endpoint:** `/users/token/`
* **Method:** `POST`
* **Permissions:** `AllowAny`
* **Description:** Authenticates user and returns JWT tokens.

#### ✅ Request Body:

```json
{
  "email": "user@nitrkl.ac.in",
  "password": "your_password"
}
```

#### 📤 Response (200 OK):

```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```

#### ❌ Error Response:

```json
{
  "detail": "No active account found with the given credentials"
}
```

---

### 3. 🔁 Refresh Token

* **Endpoint:** `/users/token/refresh/`
* **Method:** `POST`
* **Permissions:** `AllowAny`
* **Description:** Returns new access token using a valid refresh token.

#### ✅ Request Body:

```json
{
  "refresh": "<refresh_token>"
}
```

#### 📤 Response (200 OK):

```json
{
  "access": "<new_access_token>"
}
```

#### ❌ Error Response:

```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

---

### 4. 🧾 Get or Update Profile

* **Endpoint:** `/users/<id>/`
* **Methods:** `GET`, `PATCH`
* **Permissions:** `IsAuthenticated`
* **Description:** View or update the user’s own profile. Non-admin users cannot access others’ profiles.

---

#### ✅ PATCH Request Body (for Update):

```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "year": "3rd",
  "branch": "ECE",
  "roll_no": "123456",
  "phone_number": "9876543210",
  "bio": "Updated bio",
  "profile_picture": "<file>",
  "password": "new_password",
  "current_password": "old_password"
}
```

#### 📤 Response (200 OK):

```json
{
  "id": 1,
  "email": "user@nitrkl.ac.in",
  "first_name": "Jane",
  "last_name": "Doe",
  "year": "3rd",
  "branch": "ECE",
  "roll_no": "123456",
  "phone_number": "9876543210",
  "bio": "Updated bio",
  "profile_picture": "http://your-domain.com/media/profile_pictures/user.jpg",
  "is_verified": false,
  "created_at": "2024-06-01T08:30:00Z",
  "updated_at": "2024-06-12T09:00:00Z"
}
```

#### ❌ Error Responses:

```json
// Missing Current Password for Password Change
{
  "current_password": "Current password is required to update the password."
}

// Incorrect Current Password
{
  "current_password": "Current password is incorrect."
}

// Unauthorized
{
  "detail": "Authentication credentials were not provided."
}

// Forbidden
{
  "detail": "You do not have permission to perform this action."
}
```

---

## ⚙️ Notes

* ✅ **Email Restriction:** Only emails ending with `@nitrkl.ac.in` are allowed.
* 🖼️ **Profile Pictures:** Stored in `/media/profile_pictures/` and returned as URLs.
* 🔐 **JWT Expiry:**

  * Access tokens: 60 minutes
  * Refresh tokens: 7 days

* ⚠️ **Error Handling:** All errors return descriptive messages and appropriate HTTP status codes.

---

## 🛠️ Tech Stack

* Django REST Framework
* JWT Authentication (`djangorestframework-simplejwt`)
* PostgreSQL
* Cloud/File storage (for `profile_picture`)

---
