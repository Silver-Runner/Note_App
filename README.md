Notes App
A full-stack Notes Application built using React, Node.js, Express.js, and MongoDB. This app allows users to register, log in, and manage their notes with features like creating, updating, pinning, unpinning, and deleting notes.

Features
User Authentication: Login and signup functionality for users.
Dashboard: A user-specific dashboard to manage notes.
Create Note: Users can create new notes.
Update Note: Users can update their existing notes.
Pin/Unpin Note: Users can pin or unpin important notes.
Delete Note: Users can delete unwanted notes.
Tech Stack
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Token (JWT)
Installation
Prerequisites
Before running the app, make sure you have:

Node.js installed
MongoDB installed and running locally or using MongoDB Atlas

Steps
1.Clone the repository:
  git clone https://github.com/Silver-Runner/Note_App.git
2.backend setup:
  Navigate to the backend directory:
  bash
  cd backend
  Install dependencies:
  bash
  npm install
  Create a .env file in the backend directory and add the following:
  Create a .env file in the server directory and add the following:
  env
  JWT_SECRET=your_jwt_secret_key
  npm start
3.frontend setup
  Navigate to the client directory:
  cd frontend
  cd notes-app
  Install dependencies:
  npm install
  Start the frontend React app:
  npm run dev
4.Access the App:
  Open your browser and go to http://localhost:5173
  License
  This project is licensed under the MIT License. See the LICENSE file for details.[MIT.License.docx](https://github.com/user-attachments/files/16942386/MIT.License.docx)

  
