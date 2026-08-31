# RiwiMediCare Plus API

A REST API developed to manage medication supply requests between clinics, warehouses, and inventory systems.

The system enables the management of users, clinics, warehouses, medications, inventory, and supply requests, implementing JWT authentication, role-based access control, business logic validation, and soft deletion of records.

---

## Coder

**Name:** 

VALERY AVILA ORTEGA

**Clan:** 

NODE - NEST AM 

---

## Repository

https://github.com/valejo0310-svg/RiwiMediCare_Plus

---

## Technologies

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize
- JWT
- bcryptjs
- Multer
- Swagger
- Swagger JSDoc
- Helmet
- CORS
- dotenv

---

## Architecture

The project employs a separation of concerns:

Route → Middleware → Controller → Service → Repository → Model → PostgreSQL

### Route

Defines HTTP routes and corresponding middlewares.

### Middleware

Handles authentication, role-based authorization, file processing, and global error handling.

### Controller

Manages HTTP requests and responses.

### Service

Contains business logic and validation rules.

### Repository

Manages data access using Sequelize.

### Model

Defines table structures and their properties.

---

## Roles

The system supports two roles:

### ADMIN

Has access to:

- Clinic management.
- Warehouse management.
- Medication management.
- Inventory management.
- Full request management.
- Initial data loading via JSON.
- Historical data queries.

### REQUEST_MANAGER

Can:

- Create supply requests.
- Query requests.
- Query active requests.
- Query history by clinic.
- Update request status.
- Query clinics, medications, warehouses, and inventory.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/valejo0310-svg/RiwiMediCare_Plus.git

# Additional instructions for evaluation

## 1. Prerequisites

Before running the project, ensure you have the following:

- Node.js version 18 or higher.
- PostgreSQL installed and running.
- npm.
- A PostgreSQL database created for the project.

---

## 2. Installing dependencies

Run the following command from the project root:

´´´bash
npm install

cp .example.env .env

´´´
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=RiwiMedic_db
DB_USER=postgres
DB_PASSWORD=123456

JWT_SECRET=riwimedicare_secret_key
´´´

npm run dev

´´´
