# NITR Mart Backend API Documentation

Welcome to the API documentation for NITR Mart, a marketplace application built with Django REST Framework (DRF). This API enables user registration with OTP verification, user profile management, and product listing for buying/selling items. The backend uses JSON Web Tokens (JWT) for authentication and Cloudinary for image storage.

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
  - [Obtain JWT Token](#obtain-jwt-token)
  - [Refresh JWT Token](#refresh-jwt-token)
- [Users API](#users-api)
  - [Send OTP](#send-otp)
  - [Verify OTP](#verify-otp)
  - [List Users (Admin Only)](#list-users-admin-only)
  - [Create User](#create-user)
  - [Retrieve Current User Profile](#retrieve-current-user-profile)
  - [Retrieve/Update User Profile](#retrieveupdate-user-profile)
- [Products API](#products-api)
  - [List Unsold Products](#list-unsold-products)
  - [Create Product](#create-product)
  - [Retrieve/Update Product](#retrieveupdate-product)
- [Error Handling](#error-handling)
- [Setup Instructions](#setup-instructions)
- [Contact](#contact)

## Base URL
All endpoints are relative to the base URL:
```
http://localhost:8000/api/
```
In production, replace `localhost:8000` with your deployed domain.

## Authentication
The API uses JWT for authentication. Most endpoints require an `Authorization` header with a Bearer token:
```
Authorization: Bearer <access-token>
```
- **Access Token**: Short-lived, used for API requests.
- **Refresh Token**: Long-lived, used to obtain new access tokens.

### Obtain JWT Token
**Endpoint**: `POST /users/token/`
- **Description**: Authenticates a user and returns access and refresh tokens.
- **Permissions**: Open to all.
- **Request**:
  ```json
  {
      "email": "student@nitrkl.ac.in",
      "password": "securepassword123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
      "refresh": "<refresh-token>",
      "access": "<access-token>"
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:8000/api/users/token/ \
  -H "Content-Type: application/json" \
  -d '{"email": "student@nitrkl.ac.in", "password": "securepassword123"}'
  ```

### Refresh JWT Token
**Endpoint**: `POST /users/token/refresh/`
- **Description**: Refreshes an access token using a refresh token.
- **Permissions**: Open to all.
- **Request**:
  ```json
  {
      "refresh": "<refresh-token>"
  }
  ```
- **Response** (200 OK):
  ```json
  {
      "access": "<new-access-token>"
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:8000/api/users/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "<refresh-token>"}'
  ```

## Users API
Handles user registration, OTP verification, and profile management. All user emails must end with `@nitrkl.ac.in`.

### Send OTP
**Endpoint**: `POST /users/send-otp/`
- **Description**: Sends a 6-digit OTP to the provided email for verification.
- **Permissions**: Open to all.
- **Request**:
  ```json
  {
      "email": "student@nitrkl.ac.in"
  }
  ```
- **Response** (200 OK):
  ```json
  {
      "detail": "OTP sent successfully"
  }
  ```
- **Errors**:
  - 400 Bad Request: Invalid email domain.
    ```json
    {
        "email": "Only @nitrkl.ac.in email addresses are allowed."
    }
    ```
- **Example**:
  ```bash
  curl -X POST http://localhost:8000/api/users/send-otp/ \
  -H "Content-Type: application/json" \
  -d '{"email": "student@nitrkl.ac.in"}'
  ```

### Verify OTP
**Endpoint**: `POST /users/verify-otp/`
- **Description**: Verifies the OTP sent to the user’s email.
- **Permissions**: Open to all.
- **Request**:
  ```json
  {
      "email": "student@nitrkl.ac.in",
      "otp": "123456"
  }
  ```
- **Response** (200 OK):
  ```json
  {
      "detail": "OTP verified successfully",
      "email": "student@nitrkl.ac.in"
  }
  ```
- **Errors**:
  - 400 Bad Request: Invalid or expired OTP.
    ```json
    {
        "detail": "Invalid OTP or email"
    }
    ```
    ```json
    {
        "detail": "OTP has expired"
    }
    ```
- **Example**:
  ```bash
  curl -X POST http://localhost:8000/api/users/verify-otp/ \
  -H "Content-Type: application/json" \
  -d '{"email": "student@nitrkl.ac.in", "otp": "123456"}'
  ```

### List Users (Admin Only)
**Endpoint**: `GET /users/`
- **Description**: Lists all registered users.
- **Permissions**: Admin users only (`is_staff=True` or `is_superuser=True`).
- **Headers**:
  ```
  Authorization: Bearer <access-token>
  ```
- **Response** (200 OK):
  ```json
  [
      {
          "id": 1,
          "email": "student@nitrkl.ac.in",
          "first_name": "John",
          "last_name": "Doe",
          "year": "3rd",
          "branch": "Computer Science",
          "roll_no": "123456789",
          "is_verified": true,
          "created_at": "2025-06-18T08:15:00+05:30",
          "updated_at": "2025-06-18T08:15:00+05:30",
          "is_staff": false,
          "is_superuser": false,
          "role": "student",
          "department": null
      },
      ...
  ]
  ```
- **Errors**:
  - 403 Forbidden: Non-admin user.
    ```json
    {
        "detail": "You do not have permission to perform this action."
    }
    ```
- **Example**:
  ```bash
  curl -X GET http://localhost:8000/api/users/ \
  -H "Authorization: Bearer <admin-access-token>"
  ```

### Create User
**Endpoint**: `POST /users/`
- **Description**: Registers a new user with OTP verification.
- **Permissions**: Open to all.
- **Request**:
  ```json
  {
      "email": "student@nitrkl.ac.in",
      "password": "securepassword123",
      "otp": "123456",
      "first_name": "John",
      "last_name": "Doe",
      "role": "student",
      "year": "3rd",
      "branch": "Computer Science",
      "roll_no": "123456789"
  }
  ```
  - `role`: Either `"student"` or `"faculty"`.
  - For `student`: `year` and `branch` are required.
  - For `faculty`: `department` is required.
- **Response** (201 Created):
  ```json
  {
      "id": 1,
      "email": "student@nitrkl.ac.in",
      "first_name": "John",
      "last_name": "Doe",
      "year": "3rd",
      "branch": "Computer Science",
      "roll_no": "123456789",
      "is_verified": true,
      ...
  }
  ```
- **Errors**:
  - 400 Bad Request: Invalid OTP, missing fields, or invalid email domain.
    ```json
    {
        "otp": "Invalid or unverified OTP"
    },
    {
        "detail": "Year and branch are required for students"
    }
    ```
- **Example**:
  ```bash
  curl -X POST http://localhost:8000/api/users/ \
  -H "Content-Type: application/json" \
  -d '{
      "email": "student@nitrkl.ac.in",
      "password": "securepassword123",
      "otp": "123456",
      "first_name": "John",
      "last_name": "Doe",
      "role": "student",
      "year": "3rd",
      "branch": "Computer Science",
      "roll_no": "123456789"
  }'
  ```

### Retrieve Current User Profile
**Endpoint**: `GET /users/me/`
- **Description**: Retrieves the authenticated user’s profile.
- **Permissions**: Authenticated users only.
- **Headers**:
  ```
  Authorization: Bearer <access-token>
  ```
- **Response** (200 OK):
  ```json
  {
      "id": 1,
      "email": "student@nitrkl.ac.in",
      "first_name": "John",
      "last_name": "Doe",
      ...
  }
  ```
- **Errors**:
  - 401 Unauthorized: No token provided.
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    ```
- **Example**:
  ```bash
  curl -X GET http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer <access-token>"
  ```

### Retrieve/Update User Profile
**Endpoint**: `GET /users/<pk>/`, `PUT /users/<pk>/`, `PATCH /users/<pk>/`
- **Description**:
  - **GET**: Retrieves a user’s profile (authenticated users only).
  - **PUT/PATCH**: Updates a user’s profile (only the user themselves or staff/superusers).
- **Permissions**: Authenticated users for GET; user or staff/superuser for PUT/PATCH.
- **Headers**:
  ```
  Authorization: Bearer <access-token>
  ```
- **Request** (PUT/PATCH):
  ```json
  {
      "first_name": "Jane",
      "password": "newpassword123",
      "current_password": "securepassword123"
  }
  ```
  - `current_password` is required to change `password`.
- **Response** (200 OK for GET/PUT/PATCH):
  ```json
  {
      "id": 1,
      "email": "student@nitrkl.ac.in",
      "first_name": "Jane",
      ...
  }
  ```
- **Errors**:
  - 401 Unauthorized: No token.
  - 403 Forbidden: Attempting to update another user’s profile without staff privileges.
    ```json
    {
        "current_password": "Current password is required to change password"
    },
    {
        "current_password": "Incorrect password"
    }
    ```
- **Example** (GET):
  ```bash
  curl -X GET http://localhost:8000/api/users/1/ \
  -H "Authorization: Bearer <access-token>"
  ```
- **Example** (PATCH):
  ```bash
  curl -X PATCH http://localhost:8000/api/users/1/ \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
      "first_name": "Jane",
      "password": "newpassword123",
      "current_password": "securepassword123"
  }'
  ```

## Products API
Handles product listing, creation, and updates. Products are associated with a seller (user) and can include Cloudinary-hosted images.

### List Unsold Products
**Endpoint**: `GET /products/`
- **Description**: Lists all unsold products (`is_sold=False`), ordered by posting date (newest first).
- **Permissions**: Open to all (no authentication required).
- **Response** (200 OK):
  ```json
  [
      {
          "id": 1,
          "title": "Used Dell Laptop",
          "description": "Dell Inspiron, 8GB RAM, 512GB SSD, good condition.",
          "price": "500.00",
          "negotiable": true,
          "image": "https://res.cloudinary.com/<cloud_name>/image/upload/products/laptop_123.jpg",
          "category": "Electronics",
          "seller": 1,
          "seller_email": "student@nitrkl.ac.in",
          "is_sold": false,
          "posted_at": "2025-06-18T08:20:00+05:30"
      },
      ...
  ]
  ```
- **Example**:
  ```bash
  curl -X GET http://localhost:8000/api/products/
  ```

### Create Product
**Endpoint**: `POST /products/`
- **Description**: Creates a new product, linked to the authenticated user as the seller.
- **Permissions**: Authenticated users only.
- **Headers**:
  ```
  Authorization: Bearer <access-token>
  ```
- **Request** (JSON):
  ```json
  {
      "title": "Used Dell Laptop",
      "description": "Dell Inspiron, 8GB RAM, 512GB SSD, good condition.",
      "price": 500.00,
      "negotiable": true,
      "category": "Electronics"
  }
  ```
- **Request** (With Image, `multipart/form-data`):
  ```
  Content-Type: multipart/form-data
  ```
  Fields:
  - `title`: String
  - `description`: String
  - `price`: Decimal (positive)
  - `negotiable`: Boolean
  - `category`: One of ["Electronics", "Books & Study Materials", "Hostel Essentials", "Furniture", "Sports & Fitness", "Cycle & Transport", "Room Decor", "Lab Equipment", "Others"]
  - `image`: File (optional)
- **Response** (201 Created):
  ```json
  {
      "id": 1,
      "title": "Used Dell Laptop",
      "description": "Dell Inspiron, 8GB RAM, 512GB SSD, good condition.",
      "price": "500.00",
      "negotiable": true,
      "image": "https://res.cloudinary.com/<cloud_name>/image/upload/products/laptop_123.jpg",
      "category": "Electronics",
      "seller": 1,
      "seller_email": "student@nitrkl.ac.in",
      "is_sold": false,
      "posted_at": "2025-06-18T08:20:00+05:30"
  }
  ```
- **Errors**:
  - 401 Unauthorized: No token.
  - 400 Bad Request: Invalid price or category.
    ```json
    {
        "price": "Price must be positive."
    }
    ```
- **Example** (JSON):
  ```bash
  curl -X POST http://localhost:8000/api/products/ \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
      "title": "Used Dell Laptop",
      "description": "Dell Inspiron, 8GB RAM, 512GB SSD, good condition.",
      "price": 500.00,
      "negotiable": true,
      "category": "Electronics"
  }'
  ```
- **Example** (With Image):
  ```bash
  curl -X POST http://localhost:8000/api/products/ \
  -H "Authorization: Bearer <access-token>" \
  -F "title=Used Dell Laptop" \
  -F "description=Dell Inspiron, 8GB RAM, 512GB SSD." \
  -F "price=500.00" \
  -F "negotiable=true" \
  -F "category=Electronics" \
  -F "image=@/path/to/laptop.jpg"
  ```

### Retrieve/Update Product
**Endpoint**: `GET /products/<pk>/`, `PUT /products/<pk>/`, `PATCH /products/<pk>/`
- **Description**:
  - **GET**: Retrieves a product’s details.
  - **PUT/PATCH**: Updates a product (only by the seller or staff/superusers).
- **Permissions**: Authenticated users for GET; seller or staff/superuser for PUT/PATCH.
- **Headers**:
  ```
  Authorization: Bearer <access-token>
  ```
- **Request** (PUT/PATCH):
  ```json
  {
      "price": 450.00,
      "is_sold": true
  }
  ```
- **Response** (200 OK for GET/PUT/PATCH):
  ```json
  {
      "id": 1,
      "title": "Used Dell Laptop",
      "price": "450.00",
      "is_sold": true,
      ...
  }
  ```
- **Errors**:
  - 401 Unauthorized: No token.
  - 403 Forbidden: Non-seller attempting to update.
    ```json
    {
        "detail": "You can only edit your own products."
    }
    ```
- **Example** (GET):
  ```bash
  curl -X GET http://localhost:8000/api/products/1/ \
  -H "Authorization: Bearer <access-token>"
  ```
- **Example** (PATCH):
  ```bash
  curl -X PATCH http://localhost:8000/api/products/1/ \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
      "price": 450.00,
      "is_sold": true
  }'
  ```

## Error Handling
Common HTTP status codes:
- **200 OK**: Request successful.
- **201 Created**: Resource created successfully.
- **400 Bad Request**: Invalid input or validation errors.
- **401 Unauthorized**: Missing or invalid authentication.
- **403 Forbidden**: Insufficient permissions.
- **404 Not Found**: Resource not found.

Example error response:
```json
{
    "detail": "Authentication credentials were not provided."
}
```

## Setup Instructions
To run the API locally:
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd NITR-Mart-Backend
   ```
2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Environment**:
   - Create a `.env` file with:
     ```
     SECRET_KEY=your-secret-key
     DEBUG=True
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     EMAIL_HOST=your-smtp-host
     EMAIL_PORT=587
     EMAIL_HOST_USER=your-email
     EMAIL_HOST_PASSWORD=your-email-password
     DEFAULT_FROM_EMAIL=noreply@nitrkl.ac.in
     OTP_EXPIRY_MINUTES=5
     ```
4. **Apply Migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. **Run the Server**:
   ```bash
   python manage.py runserver
   ```
6. **Access the API**: Open `http://localhost:8000/api/` in a browser or API client (e.g., Postman).

## Contact
For issues or inquiries, contact the development team at:
- Email: nitrmart2027@gmail.com
- GitHub: [NITR-Mart-Repo](https://github.com/iamnitishsah/NITR-Mart)
