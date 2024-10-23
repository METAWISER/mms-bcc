<p align="center">
  <a href="./mms-logo.png" target="blank"><img src="./mms-logo.png" width="360" alt="MMS Logo" /></a>
</p>

# MMS Order Management System

## General Overview
MMS Order Management System is a backend application designed for efficient order management in an online store system. This application allows users to create, assign, and update order statuses, providing a clear structure for managing both clients and employees. The API is built using NestJS and GraphQL, facilitating flexible and secure communication between system components. MongoDB is used as the database, providing scalability and flexibility to handle data related to users, products, and orders.

## Technologies Used
- <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS" width="20" height="20" /> **Backend Framework**: NestJS
- <img src="https://graphql.org/img/logo.svg" alt="GraphQL" width="20" height="20" /> **API**: GraphQL
- <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB" width="20" height="20" /> **Database**: MongoDB
- **Libraries**:
  - **Authentication and Authorization**: Passport, JWT
  - **Data Validation**: class-validator
  - **Encryption**: bcrypt
  - **Others**: Apollo Server, Mongoose, rxjs, UUID

## Prerequisites
To run the application in a local environment, you will need the following:

- <img src="https://nodejs.org/static/images/favicons/favicon.png" alt="Node.js" width="20" height="20" /> **Node.js** (version 16 or higher)
- <img src="https://nodejs.org/static/images/favicons/favicon.png" alt="npm" width="20" height="20" /> **npm** (usually comes with Node.js)
- <img src="https://www.docker.com/favicon.ico" alt="Docker" width="20" height="20" /> **Docker** (to run the application and database in Docker containers)
- <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB" width="20" height="20" /> **MongoDB** (can be a local instance or Dockerized)

## Installation

### Cloning the Repository
1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/METAWISER/mms-bcc.git
   cd mms-order-management-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running with Docker
1. Build the Docker image:
   ```sh
   docker build -t order-management-system .
   ```
2. Run the application with Docker(OPTIONAL):
   ```sh
   docker run -p 3000:3000 --env-file .env mms-order-management-system
   ```
   Ensure you have a `.env` file at the root of the project (you can use `.env.template` as a reference).

### Running from DockerHub
1. Pull the image from DockerHub:
   ```sh
   docker pull metawiser/order-management-system-app:latest
   ```
2. Run the application with Docker:
   ```sh
   docker run -p 3000:3000 --env-file .env metawiser/order-management-system-app:latest
   ```

## Environment Configuration
- There is a `.env.template` file that contains all the necessary environment variables. You need to create a `.env` file based on this template and configure it with the appropriate values for your environment.
- Key variables:
  - `MONGO_URI`: MongoDB connection URI.
  - `JWT_SECRET`: Secret key used for signing authentication tokens.

## Authentication and Authorization
MMS Order Management System uses **JWT** for user authentication. Tokens are generated during login and used to protect API routes.

The application has three main roles: **Client**, **Employee**, and **Admin**. Each role has different permissions:
- **Client**: Can create orders.
- **Employee**: Can assign themselves to an order and change the order status.
- **Admin**: Can manage all users and orders, including creating, assigning, and deleting users.

## GraphQL API Documentation
You can explore the API using **Apollo Sandbox** by accessing `/graphql` in your browser. Here, all the schemas and mutations are available to interact with the application. You can also access the collection of operations using the following link: [GraphQL Collection](http://localhost:3000/graphql?collectionId=7d4ac47f-2deb-4fd3-9343-b871ee94adb2&focusCollectionId=7d4ac47f-2deb-4fd3-9343-b871ee94adb2).

### Running the SEED

1. Visit the site
```localhost:3000/graphql```

2. Run the __executeSeed__ "mutation" to populate the database
```graphql
mutation Mutation {
  executeSeed
}
```


Query example:

```graphql
query Orders {
  orders {
    _id
    assignedEmployee {
      _id
    }
    createdAt
    products
    status
    total
    updatedAt
    user {
      _id
    }
  }
}
```
Mutation example:
```graphql
mutation {
  createOrder(createOrderInput: $createOrderInput) {
    _id
    products
    status
    total
    user {
      _id
    }
  }
}
```

## Available Scripts
The available scripts are defined in the `package.json` file:

- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the application in production mode.
- **`npm run start:dev`**: Starts the application in development mode with hot reloading.
- **`npm run start:prod`**: Runs the compiled code in `dist`.
- **`npm run test`**: Runs all unit tests.
- **`npm run test:e2e`**: Runs end-to-end tests.
- **`npm run lint`**: Analyzes code to find and fix styling issues.

## Testing
The application includes unit tests and end-to-end (e2e) tests using **Jest**. To run these tests:

- Unit tests: `npm run test`
- End-to-end tests: `npm run test:e2e`
- Test coverage: `npm run test:cov`

---
## Contact
**Carlos Zamora** 
- **GitHub**: [@metawiser](https://github.com/metawiser)
- **LinkedIn**: [linkedin.com/in/carlos-zamora-n/](https://www.linkedin.com/in/carlos-zamora-n/)
- **Web**: [thecarloszamora.com](https://thecarloszamora.com)
