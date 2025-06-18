# NITR Mart - Campus Marketplace

Welcome to **NITR Mart**, a dedicated online marketplace designed for the NIT Rourkela community. This platform connects students, faculty, and staff to buy and sell items within the campus, fostering a vibrant, sustainable, and convenient trading ecosystem. Built with modern web technologies, NITR Mart ensures a secure, user-friendly experience for listing products, managing profiles, and facilitating transactions.

## Project Idea

NITR Mart addresses the need for a centralized, campus-specific platform where NIT Rourkela members can trade items like electronics, books, hostel essentials, and more. Inspired by the challenges of finding reliable second-hand goods within a trusted community, the platform aims to:
- **Simplify Trading**: Provide an intuitive interface for listing and discovering products.
- **Ensure Trust**: Restrict access to verified `@nitrkl.ac.in` email users, ensuring a safe community.
- **Promote Sustainability**: Encourage reuse of items like study materials and furniture, reducing waste.
- **Enhance Connectivity**: Facilitate direct communication between buyers and sellers via WhatsApp.

The project combines a robust Django REST Framework backend with a responsive frontend, leveraging technologies like JWT authentication, Cloudinary for media storage, and OTP-based registration to deliver a seamless experience.

## Features

### User Management
- **OTP-Based Registration**: Users register with their `@nitrkl.ac.in` email, verified via a 6-digit OTP sent to their inbox, ensuring only NIT Rourkela members can join.
- **Role-Based Profiles**: Supports distinct profiles for students (with year, branch, roll number) and faculty (with department), tailoring the experience to user types.
- **Profile Management**: Users can view and update their details, including name, password, and role-specific fields, with secure password changes requiring current password verification.
- **Admin Access**: Staff and superusers can list all users for administrative oversight.

### Product Marketplace
- **Product Listings**: Users can create listings for items across categories like Electronics, Books & Study Materials, Hostel Essentials, Furniture, Sports & Fitness, Cycle & Transport, Room Decor, Lab Equipment, and Others.
- **Rich Product Details**: Listings include title, description, price (with negotiable option), category, and optional images hosted on Cloudinary.
- **Unsold Products Display**: The platform prominently displays unsold items, ordered by posting date (newest first), for easy browsing.
- **Product Updates**: Sellers can edit their listings (e.g., price, sale status) or mark items as sold, with access restricted to the seller or admins.
- **Image Support**: Users can upload product images, stored securely on Cloudinary for fast, reliable access.

### Buyer-Seller Interaction
- **Contact Seller via WhatsApp**: Buyers can contact sellers directly through a "Contact Seller" feature on the frontend, which redirects to the seller’s WhatsApp chat using their registered phone number. This enables quick, personal communication to negotiate prices or arrange meetups.
- **Seller Information**: Product listings display the seller’s email (e.g., `student@nitrkl.ac.in`), providing transparency while maintaining privacy.

### Security and Access Control
- **JWT Authentication**: Secure API access with JSON Web Tokens, including access and refresh tokens for session management.
- **Permission Controls**:
  - Product listing and updates are restricted to authenticated users.
  - Profile updates are limited to the user or admins.
  - User listing is exclusive to admins.
  - Product browsing is open to all, but interactions (e.g., creating, updating) require authentication.
- **Email Verification**: Ensures all users are part of the NIT Rourkela community via `@nitrkl.ac.in` email validation.

### User Experience
- **Responsive Frontend**: A modern, mobile-friendly interface for browsing products, managing profiles, and listing items, built with [insert frontend tech, e.g., React if applicable].
- **Intuitive Navigation**: Easy access to categories, user profiles, and product details, with clear calls-to-action like "Contact Seller".
- **Real-Time Updates**: Product listings and user profiles reflect changes instantly, ensuring a dynamic experience.

## Project Structure
- **Backend**: A Django REST Framework API handling user authentication, OTP verification, and product management. See `backend/README.md` for API details.
- **Frontend**: A responsive web application for user interaction, including product browsing, listing, and WhatsApp redirection. See `frontend/README.md` for frontend details.

## Vision
NITR Mart aims to be the go-to platform for NIT Rourkela’s campus community, fostering trust, convenience, and sustainability. Future enhancements may include:
- Search and filtering by category, price, or keyword.
- In-app messaging for buyer-seller communication.
- Rating/review system for sellers.
- Integration with campus events for bulk sales (e.g., graduating students).

## Contact
For feedback or contributions, reach out to the development team:
- Email: nitrmart2027@gmail.com
- GitHub: [NITR-Mart-Repo](https://github.com/iamnitishsah/NITR-Mart)