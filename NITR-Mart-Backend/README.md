# NITRMart API Documentation

## Overview
NITRMart is a marketplace platform for NIT Rourkela students and faculty. This document provides comprehensive API documentation for frontend developers to integrate with the backend system.

## Base URL
`http://your-domain.com/api/`

## Authentication
All endpoints (except login/register) require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

## User Management

### 1. Register a New User
**Endpoint**: `/users/register/`  
**Method**: POST  
**Permissions**: AllowAny  
**Request Body**:
```json
{
    "username": "string",
    "email": "string@nitrkl.ac.in",
    "password": "string",
    "confirm_password": "string",
    "first_name": "string",
    "last_name": "string",
    "role": "student|faculty|staff",
    
    // Student specific fields
    "year": "string", // required if role=student
    "branch": "string", // required if role=student
    "roll_no": "string", // optional
    
    // Faculty/Staff specific fields
    "department": "string", // required if role=faculty or staff
    "employee_id": "string", // optional
    
    "bio": "string", // optional
    "profile_picture": file // optional
}
```

**Response**:
```json
{
    "message": "Registration successful",
    "user": {
        "id": 1,
        "username": "string",
        "email": "string@nitrkl.ac.in",
        "first_name": "string",
        "last_name": "string",
        "full_name": "string",
        "role": "student",
        "year": "string",
        "branch": "string",
        "roll_no": "string",
        "department": "string",
        "employee_id": "string",
        "profile_picture": "url",
        "bio": "string",
        "is_verified": false,
        "created_at": "datetime"
    },
    "tokens": {
        "refresh": "string",
        "access": "string"
    }
}
```

### 2. Login
**Endpoint**: `/users/login/`  
**Method**: POST  
**Permissions**: AllowAny  
**Request Body**:
```json
{
    "email": "string@nitrkl.ac.in",
    "password": "string"
}
```

**Response**:
```json
{
    "message": "Login successful",
    "user": {
        // Same user object as registration
    },
    "tokens": {
        "refresh": "string",
        "access": "string"
    }
}
```

### 3. Refresh Token
**Endpoint**: `/users/token/refresh/`  
**Method**: POST  
**Permissions**: AllowAny  
**Request Body**:
```json
{
    "refresh": "string"
}
```

**Response**:
```json
{
    "access": "string"
}
```

### 4. Logout
**Endpoint**: `/users/logout/`  
**Method**: POST  
**Permissions**: IsAuthenticated  
**Request Body**:
```json
{
    "refresh": "string"
}
```

**Response**:
```json
{
    "message": "Logout successful"
}
```

### 5. Get/Update Profile
**Endpoint**: `/users/profile/`  
**Methods**: 
- GET: Retrieve user profile
- PUT/PATCH: Update profile

**Permissions**: IsAuthenticated  
**Request Body (for update)**:
```json
{
    "first_name": "string",
    "last_name": "string",
    "year": "string",
    "branch": "string",
    "roll_no": "string",
    "department": "string",
    "employee_id": "string",
    "bio": "string",
    "profile_picture": file
}
```

**Response**:
```json
{
    // Same user object as registration
}
```

### 6. Change Password
**Endpoint**: `/users/change-password/`  
**Method**: POST  
**Permissions**: IsAuthenticated  
**Request Body**:
```json
{
    "old_password": "string",
    "new_password": "string",
    "new_password_confirm": "string"
}
```

**Response**:
```json
{
    "message": "Password changed successfully"
}
```

## Product Management

### 1. List/Create Products
**Endpoint**: `/products/`  
**Methods**: 
- GET: List all products
- POST: Create new product

**Permissions**: 
- GET: AllowAny
- POST: IsAuthenticated

**Request Body (for create)**:
```json
{
    "title": "string",
    "description": "string",
    "price": "decimal",
    "negotiable": boolean,
    "category_id": integer,
    "image": file, // main image
    "images": [files] // additional images
}
```

**Response (for create)**:
```json
{
    "id": 1,
    "title": "string",
    "description": "string",
    "price": "decimal",
    "negotiable": boolean,
    "image": "url",
    "category": {
        "id": 1,
        "name": "string"
    },
    "seller": integer,
    "seller_name": "string",
    "is_sold": false,
    "posted_at": "datetime",
    "images": [
        {
            "id": 1,
            "image": "url"
        }
    ]
}
```

### 2. Retrieve/Update/Delete Product
**Endpoint**: `/products/<id>/`  
**Methods**: 
- GET: Retrieve product details
- PUT/PATCH: Update product
- DELETE: Delete product

**Permissions**: 
- GET: AllowAny
- PUT/PATCH/DELETE: IsAuthenticated (only seller can modify)

**Request Body (for update)**:
```json
{
    "title": "string",
    "description": "string",
    "price": "decimal",
    "negotiable": boolean,
    "category_id": integer,
    "image": file,
    "images": [files] // additional images to add
}
```

**Response (for GET)**:
```json
{
    // Same as product create response
}
```

## Error Responses
All error responses follow this format:
```json
{
    "error": "Error message",
    // or
    "field_name": ["Error message"]
}
```

## Media Handling
- Profile pictures are uploaded to `/media/profile_pictures/`
- Product images are uploaded to `/media/products/images/`

## Important Notes
1. All email addresses must be `@nitrkl.ac.in` domains
2. JWT tokens expire after 60 minutes (access) and 7 days (refresh)
3. Password requirements:
   - Minimum 8 characters
   - Cannot be too similar to user attributes
   - Cannot be entirely numeric
   - Cannot be a common password

## Setup Instructions (for reference)
1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Start server: `python manage.py runserver`

The API will be available at `http://localhost:8000/` by default.

Let me know if you need any clarification or additional details for the frontend implementation!