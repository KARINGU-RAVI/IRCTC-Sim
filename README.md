# IRCTC Booking Simulation

A full-stack web application simulating the IRCTC train booking system.

## Features

- **User Authentication**: Login and Signup.
- **Train Search**: Search by source and destination.
- **Booking System**: Select class, add passengers, and book tickets.
- **Payment Simulation**: Mock payment gateway.
- **User Dashboard**: View booking history and saved passengers.
- **Admin Panel**: Add new train routes.

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Node.js, Express
- **Database**: JSON file-based simulation (persisted in `server/db.json`)

## Setup

1. **Backend**:
   ```bash
   cd server
   npm install
   node index.js
   ```
   Server runs on `http://localhost:5000`.

2. **Frontend**:
   ```bash
   cd client
   npm start
   ```
   Client runs on `http://localhost:3000`.

## Project Structure

- `client/`: React frontend application.
- `server/`: Node.js/Express backend.
