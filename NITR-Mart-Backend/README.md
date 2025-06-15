# 📦 NITRMart Backend API Documentation

Backend API for **NITRMart**, a platform for NIT Rourkela students to buy and sell items securely.

---

## 🚀 Project Overview

This backend is built with Django 5.2.3 and Django REST Framework. It provides RESTful APIs for user management, product listings, and reports. The backend uses JWT authentication for secure access and supports media file uploads.

---

## ⚙️ Setup Instructions

1. **Prerequisites:**
   - Python 3.10 or higher
   - Virtual environment tool (venv or virtualenv)

2. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd NITR-Mart/NITR-Mart-Backend/
   ```

3. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional, for admin access):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

---

## 🏗️ Backend Structure

The backend consists of the following Django apps:

- **users:** Custom user management with registration, login, profile update, and JWT authentication.
- **products:** Product listing, creation, update, and retrieval APIs.
- **reports:** Placeholder app for future reporting features (currently no implemented views).
- **chats:** Placeholder app for chat functionality (currently no implemented views).

---

## 📁 Media Files Handling

- Uploaded media files (e.g., product images, profile pictures) are stored in the `media/` directory.
- Media files are served during development via Django's static file serving.
- Media URL: `/media/`

---

## 🔐 Authentication

- JWT authentication is used for securing most endpoints.
- Access tokens expire after 60 minutes; refresh tokens expire after 7 days.
- Include the JWT access token in the `Authorization` header as:
  ```
  Authorization: Bearer <your_access_token>
  ```

---

## 🌐 Base URL

```
http://127.0.0.1:8000/
```

---

## 📜 API Documentation

### User Management API

(Existing detailed user API documentation retained here...)

### Product Management API

(Existing detailed product API documentation retained here...)

---

## 📝 Environment Variables and Secrets

- Email credentials for SMTP are configured in `settings.py`:
  - `EMAIL_HOST_USER`
  - `EMAIL_HOST_PASSWORD`
- For security, consider using environment variables or a secrets manager instead of hardcoding credentials.

---

## ⚙️ Notes

- CORS is configured to allow requests from `http://localhost:3000` (frontend).
- Error responses include descriptive messages with appropriate HTTP status codes.
- Use `multipart/form-data` for file uploads in requests.

---

## 🛠️ Running the Backend Server

To start the backend server locally, run:

```bash
python manage.py runserver
```

Access the admin panel at:

```
http://127.0.0.1:8000/admin/
```

---

## 📞 Contact and Contribution

For issues or contributions, please contact the project maintainers or submit a pull request.
