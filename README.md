Incident Portal for Software Defects
This repository contains a CRUD Incident Portal built to track and manage software defects (incidents). It provides an easy-to-use interface for creating, reading, updating, and deleting incidents, helping development teams efficiently manage defects and bugs during the software development lifecycle.

Key Features:
Create new incidents (defects) with details like title, description, and priority.
Read incidents to view defect details.
Update incident status, severity, description, etc.
Delete resolved or invalid incidents.
Table of Contents
Technologies Used
Getting Started
API Endpoints
Database Schema
Contributing
License
Technologies Used
Frontend: Next.js
Backend: Next.js API Routes
Database: Prisma ORM + SQLite
Validation: Zod
Deployment: Vercel
Getting Started
Follow the steps below to get a copy of the project up and running locally for development and testing purposes.

Prerequisites
Node.js (v14 or later)
npm (or yarn)
Installation
Clone the repository:

bash
Copy
git clone https://github.com/your-username/incident-portal.git
cd incident-portal
Install dependencies:

bash
Copy
npm install
Set up the database:

Create a .env file in the root directory and add the following content:

makefile
Copy
DATABASE_URL="file:./dev.db"
Run the Prisma migrations to set up your SQLite database:

bash
Copy
npx prisma migrate dev
Start the development server:

bash
Copy
npm run dev
Visit http://localhost:3000 in your browser to see the portal in action.

API Endpoints
This project exposes the following API routes for managing incidents:

Create Incident (POST /api/incidents)
Description: Create a new incident.

Request body:

json
Copy
{
  "title": "Issue with login button",
  "description": "The login button does not trigger the login modal.",
  "priority": "high"
}
Response: Returns the created incident object.

Get All Incidents (GET /api/incidents)
Description: Fetch all incidents from the database.
Response: Returns a list of incidents.
Get Incident by ID (GET /api/incidents/[id])
Description: Fetch a specific incident by ID.
Response: Returns the incident object with the provided ID.
Update Incident (PATCH /api/incidents/[id])
Description: Update an existing incident.

Request body:

json
Copy
{
  "title": "Issue with login button (fixed)",
  "description": "The login button now works after fixing the modal trigger.",
  "priority": "medium"
}
Response: Returns the updated incident object.

Delete Incident (DELETE /api/incidents/[id])
Description: Delete a specific incident by ID.
Response: Returns a success message with status 200.
Database Schema
The Prisma schema defines the structure of the Incident model. It uses an SQLite database for simplicity but can be configured to use other databases (PostgreSQL, MySQL, etc.) by modifying the DATABASE_URL in the .env file.

prisma
Copy
model Incident {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  priority    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
