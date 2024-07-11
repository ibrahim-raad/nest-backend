# NestJS Backend Project

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Introduction

This is a backend application built with NestJS and TypeORM, using PostgreSQL as the database. The application follows a modular architecture and includes basic user management features.

## Features

- Modular architecture
- User management (CRUD operations)
- Database integration with PostgreSQL
- Environment-based configuration

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- Docker and Docker Compose
- PostgreSQL (optional if running outside Docker)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nest-backend.git

   cd nest-backend
   Running the Application
   
  
Using Docker


Build and run the Docker containers:

bash

docker compose up --build


The application should now be running at http://localhost:3000.

Without Docker:


Make sure you have PostgreSQL running locally.

Update the .env file with your local PostgreSQL configurations.

Run the application:

bash

npm run start:dev

The application should now be running at http://localhost:3000.

Endpoints


The following endpoints are available in the application:

Users


GET /users: Retrieve all users

GET /users/

: Retrieve a user by ID

POST /users: Create a new user

PUT /users/

: Update a user by ID

DELETE /users/

: Delete a user by ID


Environment Variables


Create a .env file in the root directory and configure the following variables:

env

DB_TYPE=postgres

PG_HOST=your_postgres_host

PG_PORT=your_postgres_port

PG_USER=your_postgres_user

PG_PASSWORD=your_postgres_password

PG_DB=your_postgres_db

Example .env file:


env

DB_TYPE=postgres

PG_HOST=localhost

PG_PORT=5432

PG_USER=postgres

PG_PASSWORD=postgres

PG_DB=nest

Troubleshooting

Common Issues

Database Connection Errors


Ensure your PostgreSQL server is running and the connection details in the .env file are correct.
If using Docker, make sure the containers are running without errors.
Entity Metadata Not Found

Ensure entities are correctly listed in the TypeOrmModule configuration in app.module.ts and users.module.ts.
Docker Issues

Run docker compose down -v to remove volumes and docker compose up --build to rebuild the containers.