# Salon Booking System – User Authentication Service

This repository contains the **User Authentication and Role Management Microservice** for the Salon Booking System.
It is responsible for handling **authentication, authorization, user profile management, and password reset functionality** for different system roles.

The service is built using **Node.js, Express.js, MongoDB, and JWT authentication**, following **microservice architecture principles**.

---

# 🚀 Features

### Authentication

* Customer registration
* Login for all roles (Admin, Staff, Customer)
* Secure JWT authentication
* HTTP-only cookie based session handling

### Authorization

* Role-based access control
* Admin
* Staff
* Customer

### User Management

Admin can manage:

* Staff accounts
* Customer accounts

Operations include:

* Create users
* View users
* Update users
* Delete users

### Profile Management

Each user can manage their own profile:

Staff:

* View profile
* Update profile

Customer:

* View profile
* Update profile

### Password Reset System

Secure password recovery mechanism:

1. Forgot password request
2. Reset token generated
3. Email sent using Nodemailer
4. Password reset using token
5. All previous sessions invalidated after password reset

### Security Features

* Password hashing using **bcrypt**
* JWT authentication
* Token expiration
* Session invalidation after password reset
* Input validation using **express-validator**
* Protected routes with middleware
* HTTP-only cookies
* Role based route protection

### API Documentation

The API documentation is provided using **Swagger UI**.

Swagger provides:

* Interactive API testing
* Request body schemas
* Authentication support
* Endpoint descriptions

Swagger URL:

```
http://localhost:5000/api-docs
```

---

# 🏗 Tech Stack

Backend Framework

* Node.js
* Express.js

Database

* MongoDB
* Mongoose

Authentication

* JWT (JSON Web Tokens)
* bcrypt password hashing

Email Service

* Nodemailer
* Gmail SMTP

API Documentation

* Swagger
* swagger-jsdoc
* swagger-ui-express

Validation

* express-validator

---

# 📂 Project Structure

```
backend
│
├── src
│   ├── config
│   │   └── db.js
│
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── staff.controller.js
│   │   ├── staff_management.controller.js
│   │   ├── customer.controller.js
│   │   └── customer_management.controller.js
│
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│
│   ├── models
│   │   └── user.model.js
│
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── staff.routes.js
│   │   ├── staff_management.routes.js
│   │   ├── customer.routes.js
│   │   └── customer_management.routes.js
│
│   ├── validators
│   │   ├── auth.validators.js
│   │   ├── staff.validators.js
│   │   ├── staff_management.validators.js
│   │   ├── customer.validators.js
│   │   └── customer_management.validators.js
│
│   ├── utils
│   │   ├── generateToken.js
│   │   └── emailService.js
│
│   └── swagger
│       └── swagger.js
│
├── index.js
├── .env
└── package.json
```

---

# ⚙️ Installation Guide

### 2️⃣ Install Dependencies

```
pnpm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

FRONTEND_URL=http://localhost:3000
```

---

### 4️⃣ Start Server

```
pnpm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# 📖 API Endpoints Overview

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Password Management

```
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

### Staff Profile

```
GET  /api/staff/profile
PUT  /api/staff/profile
```

### Customer Profile

```
GET  /api/customer/profile
PUT  /api/customer/profile
```

### Admin – Staff Management

```
POST   /api/staff-management/create
GET    /api/staff-management/getall
GET    /api/staff-management/get/:id
PUT    /api/staff-management/update/:id
DELETE /api/staff-management/delete/:id
```

### Admin – Customer Management

```
GET    /api/customer-management/getall
GET    /api/customer-management/get/:id
PUT    /api/customer-management/update/:id
DELETE /api/customer-management/delete/:id
```

---

# 🔐 Role Based Access

| Role     | Permissions                |
| -------- | -------------------------- |
| Admin    | Manage staff and customers |
| Staff    | Manage own profile         |
| Customer | Manage own profile         |

---

# 📧 Password Reset Flow

1. User requests password reset

```
POST /api/auth/forgot-password
```

2. Reset email is sent

3. User clicks reset link

```
POST /api/auth/reset-password/:token
```

4. Password updated and sessions invalidated

---

# 🧪 API Testing

API can be tested using:

* Swagger UI
* Postman
* Thunder Client
* cURL

Swagger URL:

```
http://localhost:5000/api-docs
```

---

# 🛡 Security Practices Implemented

* JWT authentication
* Secure password hashing
* Input validation
* Role-based access control
* Session invalidation
* Secure cookies
* Password reset token expiration

---

# 👨‍💻 Author

Nagahawaththa J.C.D - IT22573896

Developed as part of the **SE4010 – Current Trends in Software Engineering** module assignment.

Sri Lanka Institute of Information Technology (SLIIT)

---

