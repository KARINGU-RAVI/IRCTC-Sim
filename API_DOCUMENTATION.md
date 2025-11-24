# IRCTC Simulation - Backend API Documentation

Base URL: `http://localhost:5000`

## Table of Contents
- [Authentication APIs](#authentication-apis)
- [Train APIs](#train-apis)
- [Booking APIs](#booking-apis)
- [Passenger APIs](#passenger-apis)

---

## Authentication APIs

### 1. User Login
**Endpoint:** `POST /api/login`

**Description:** Authenticate user with email and password

**Request Body:**
```json
{
  "email": "ravi@test.com",
  "password": "123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "name": "Ravi",
    "email": "ravi@test.com",
    "role": "user",
    "wallet": 5000,
    "savedPassengers": []
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. User Signup
**Endpoint:** `POST /api/signup`

**Description:** Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1732456789012,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "wallet": 10000,
    "savedPassengers": []
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

## Train APIs

### 3. Search Trains
**Endpoint:** `GET /api/trains`

**Description:** Get all trains or filter by source and destination

**Query Parameters:**
- `source` (optional): Source station name (case-insensitive partial match)
- `destination` (optional): Destination station name (case-insensitive partial match)

**Example Request:**
```
GET /api/trains?source=New%20Delhi&destination=Mumbai
```

**Success Response (200):**
```json
[
  {
    "id": 101,
    "name": "Rajdhani Express",
    "source": "New Delhi",
    "destination": "Mumbai",
    "departureTime": "16:00",
    "arrivalTime": "08:30",
    "classes": [
      {
        "type": "1A",
        "price": 4000,
        "seats": 20
      },
      {
        "type": "2A",
        "price": 2500,
        "seats": 50
      },
      {
        "type": "3A",
        "price": 1800,
        "seats": 100
      }
    ],
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  }
]
```

---

### 4. Add Train (Admin)
**Endpoint:** `POST /api/trains`

**Description:** Add a new train route (Admin only)

**Request Body:**
```json
{
  "name": "Duronto Express",
  "source": "Bangalore",
  "destination": "Delhi",
  "departureTime": "20:00",
  "arrivalTime": "06:30",
  "classes": [
    {
      "type": "2A",
      "price": 2000,
      "seats": 100
    },
    {
      "type": "SL",
      "price": 600,
      "seats": 200
    }
  ],
  "days": ["Mon", "Wed", "Fri", "Sun"]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "train": {
    "id": 1732456789012,
    "name": "Duronto Express",
    "source": "Bangalore",
    "destination": "Delhi",
    "departureTime": "20:00",
    "arrivalTime": "06:30",
    "classes": [...],
    "days": ["Mon", "Wed", "Fri", "Sun"]
  }
}
```

---

## Booking APIs

### 5. Create Booking
**Endpoint:** `POST /api/bookings`

**Description:** Create a new train ticket booking

**Request Body:**
```json
{
  "userId": 2,
  "trainId": 101,
  "date": "2025-12-01",
  "passengerDetails": [
    {
      "name": "John Doe",
      "age": 30,
      "gender": "Male",
      "berth": "Lower"
    }
  ],
  "totalAmount": 4000
}
```

**Success Response (200):**
```json
{
  "success": true,
  "booking": {
    "id": 1732456789012,
    "userId": 2,
    "trainId": 101,
    "date": "2025-12-01",
    "passengerDetails": [...],
    "totalAmount": 4000,
    "status": "Booked",
    "bookingDate": "2025-11-24T06:57:22.345Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid amount"
}
```

---

### 6. Get User Bookings
**Endpoint:** `GET /api/bookings/:userId`

**Description:** Get all bookings for a specific user

**URL Parameters:**
- `userId`: User ID (number)

**Example Request:**
```
GET /api/bookings/2
```

**Success Response (200):**
```json
[
  {
    "id": 1732456789012,
    "userId": 2,
    "trainId": 101,
    "trainName": "Rajdhani Express",
    "date": "2025-12-01",
    "passengerDetails": [...],
    "totalAmount": 4000,
    "status": "Booked",
    "bookingDate": "2025-11-24T06:57:22.345Z"
  }
]
```

---

## Passenger APIs

### 7. Add Saved Passenger
**Endpoint:** `POST /api/passengers`

**Description:** Add a passenger to user's saved passenger list

**Request Body:**
```json
{
  "userId": 2,
  "passenger": {
    "name": "Jane Doe",
    "age": 28,
    "gender": "Female"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "passengers": [
    {
      "name": "Jane Doe",
      "age": 28,
      "gender": "Female"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 8. Get Saved Passengers
**Endpoint:** `GET /api/passengers/:userId`

**Description:** Get all saved passengers for a specific user

**URL Parameters:**
- `userId`: User ID (number)

**Example Request:**
```
GET /api/passengers/2
```

**Success Response (200):**
```json
[
  {
    "name": "Jane Doe",
    "age": 28,
    "gender": "Female"
  },
  {
    "name": "John Smith",
    "age": 35,
    "gender": "Male"
  }
]
```

---

## Health Check

### 9. Root Endpoint
**Endpoint:** `GET /`

**Description:** Check if API server is running

**Success Response (200):**
```
IRCTC Simulation API Running
```

---

## Error Handling

All API endpoints follow a consistent error response format:

**Error Response Structure:**
```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200 OK`: Successful request
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Invalid credentials
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Notes

1. **Authentication**: Currently uses simple email/password validation. No JWT tokens implemented (simulation only).
2. **Payment**: Payment gateway is simulated using if/else logic (always succeeds if amount > 0).
3. **Database**: Uses JSON file-based storage (`db.json`) instead of a real database.
4. **CORS**: Enabled for all origins (development mode).
5. **Default Users**:
   - Admin: `admin@irctc.com` / `admin` (role: admin)
   - Test User: `ravi@test.com` / `123` (role: user)

---

## Running the Server

```bash
cd server
node index.js
# or
nodemon index.js
```

Server will run on: **http://localhost:5000**
