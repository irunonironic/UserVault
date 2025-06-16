# UserVault

Simple user authentication API built with Express.js.

## Features

- User registration and login
- Token-based authentication
- Protected routes
- Session management

## Installation

```bash
npm install express
```

```bash
node app.js
```

Server runs on port 3000.

## API Endpoints

- `GET /` - Health check
- `POST /register` - Register new user (username, password)
- `POST /login` - Login user, returns token
- `GET /profile` - Get user profile (requires Bearer token)
- `POST /logout` - Logout user

## Authentication

Use `Authorization: Bearer <token>` header for protected routes.

## Requirements

- Node.js
- Express.js

## Notes

Basic implementation for development. Not production-ready.
