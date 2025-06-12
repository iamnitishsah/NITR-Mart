# 📦 NITRMart API Documentation

Backend API for **NITRMart**, a platform for NIT Rourkela students to buy and sell items securely.

## 🌐 Base URL

```
http://127.0.0.1:8000/
```

## 🔐 Authentication

All endpoints (except registration, login, token refresh, and product listing) require **JWT authentication**.  
Include the token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

---

## 👤 User Management API

This API allows users to register, log in, and manage their profiles securely using JWT authentication.

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
```

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
{ "email": "Only @nitrkl.ac.in email addresses are allowed." }

// Missing Fields
{
  "email": ["This field is required."],
  "first_name": ["This field is required."]
}
```

### 2. 🔑 Login

- **Endpoint:** `/users/token/`  
- **Method:** `POST`  
- **Permissions:** `AllowAny`  
- **Description:** Authenticates a user and returns JWT tokens.

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
{ "detail": "No active account found with the given credentials" }
```

### 3. 🔁 Refresh Token

- **Endpoint:** `/users/token/refresh/`  
- **Method:** `POST`  
- **Permissions:** `AllowAny`  
- **Description:** Returns a new access token using a valid refresh token.

#### ✅ Request Body:

```json
{ "refresh": "<refresh_token>" }
```

#### 📤 Response (200 OK):

```json
{ "access": "<new_access_token>" }
```

#### ❌ Error Response:

```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

### 4. 🧾 Get or Update Profile

- **Endpoint:** `/users/<id>/`  
- **Methods:** `GET`, `PATCH`  
- **Permissions:** `IsAuthenticated`  
- **Description:** View or update the user’s own profile.

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
  "profile_picture": "http://127.0.0.1:8000/media/profile_pictures/user.jpg",
  "is_verified": false,
  "created_at": "2025-06-01T12:30:00Z",
  "updated_at": "2025-06-12T17:00:00Z"
}
```

#### ❌ Error Responses:

```json
// Missing Current Password
{ "current_password": "Current password is required to update the password." }

// Incorrect Current Password
{ "current_password": "Current password is incorrect." }

// Unauthorized
{ "detail": "Authentication credentials were not provided." }

// Forbidden
{ "detail": "You do not have permission to perform this action." }
```

---

## 🛍️ Product Management API

This API allows users to list, create, view, and update products for sale.

### 1. 📋 List Products

- **Endpoint:** `/products/`  
- **Method:** `GET`  
- **Permissions:** `AllowAny`  
- **Description:** Retrieves all unsold products.

#### 📤 Response (200 OK):

```json
[
  {
    "id": 1,
    "title": "Laptop",
    "description": "Dell XPS 13, 16GB RAM",
    "price": "500.00",
    "negotiable": true,
    "image": "http://127.0.0.1:8000/media/products/images/laptop.jpg",
    "category": "Electronics",
    "seller": "user@nitrkl.ac.in",
    "is_sold": false,
    "posted_at": "2025-06-12T12:30:00Z"
  }
]
```

### 2. 🆕 Create a Product

- **Endpoint:** `/products/`  
- **Method:** `POST`  
- **Permissions:** `IsAuthenticated`  
- **Description:** Creates a new product listing. The seller is automatically set to the authenticated user.


**Allowed Categories:**
- Electronics  
- Books & Study Materials  
- Hostel Essentials  
- Furniture  
- Clothing & Accessories  
- Sports & Fitness  
- Cycle & Transport  
- Room Decor  
- Stationery  
- Lab Equipment  
- Event Costumes  
- Others



#### ✅ Request Body:

```json
{
  "title": "Bicycle",
  "description": "Hero Ranger, good condition",
  "price": 100.00,
  "negotiable": true,
  "category": "Cycle & Transport",
  "image": "<file>"
}
```

#### 📤 Response (201 Created):

```json
{
  "id": 3,
  "title": "Bicycle",
  "description": "Hero Ranger, good condition",
  "price": "100.00",
  "negotiable": true,
  "image": "http://127.0.0.1:8000/media/products/images/bicycle.jpg",
  "category": "Cycle & Transport",
  "seller": "user@nitrkl.ac.in",
  "is_sold": false,
  "posted_at": "2025-06-12T17:30:00Z"
}
```

### 3. 🔍 Get or Update Product

- **Endpoint:** `/products/<id>/`  
- **Methods:** `GET`, `PATCH`  
- **Permissions:** `IsAuthenticated`  
- **Description:** View or update a product. Only seller can modify.

#### ✅ PATCH Request Body:

```json
{
  "title": "Updated Bicycle",
  "price": 90.00,
  "category": "Others",
  "is_sold": true,
  "image": "<file>"
}
```

#### 📤 Response (200 OK):

```json
{
  "id": 3,
  "title": "Updated Bicycle",
  "description": "Hero Ranger, good condition",
  "price": "90.00",
  "negotiable": true,
  "image": "http://127.0.0.1:8000/media/products/images/bicycle_updated.jpg",
  "category": "Others",
  "seller": "user@nitrkl.ac.in",
  "is_sold": true,
  "posted_at": "2025-06-12T17:30:00Z"
}
```

---

## ⚙️ Notes

- ✅ **Email Restriction:** Only `@nitrkl.ac.in` emails are allowed for registration.
- 🔐 **JWT Expiry:**
  - Access tokens: 60 minutes
  - Refresh tokens: 7 days
- ⚠️ **Error Handling:** Returns descriptive messages with appropriate HTTP status codes.
- 📸 **Image Uploads:** Use multipart/form-data for file uploads in requests.