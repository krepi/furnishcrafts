# Custom Furniture Manufacturing System

### Table of Contents

- [Project Description](#project-description)
- [Functional Requirements](#functional-requirements)
    - [User Registration and Authentication](#user-registration-and-authentication)
    - [Order Placement](#order-placement)
    - [Cost Estimation](#cost-estimation)
    - [Order Tracking](#order-tracking)
    - [Inventory Management](#inventory-management)
    - [Admin Panel](#admin-panel)
- [Non-Functional Requirements](#non-functional-requirements)
    - [Performance](#performance)
    - [Scalability](#scalability)
    - [Security](#security)
    - [Reliability](#reliability)
    - [Usability](#usability)
- [Technologies and Their Applications](#technologies-and-their-applications)
    - [Backend](#backend)
    - [Database](#database)
    - [DevOps](#devops)
    - [Security](#security-1)
- [Database Documentation](#database-documentation)
- [REST API Endpoints](#rest-api-endpoints)
- [Testing and CI/CD](#testing-and-cicd)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Future Enhancements](#future-enhancements)





## Admin Credentials and JWT Secret

### Admin Credentials
To test the application with admin privileges, use the following login credentials:
- **Email:** `admin@example.com`
- **Password:** `adminpass`

### JWT Secret
To generate a JWT secret token, use the `crypto.js` file located in the `backend/src/helpers` folder. This will allow you to create a secure token for authentication purposes.
```bash
node backend/src/helpers/crypto.js

```
## Project Description

The Custom Furniture Manufacturing System is a web application designed to streamline the process of ordering
custom-made furniture. When a customer places an order, the system estimates the production time, material costs, and
labor costs. It also tracks the progress of the order from initiation to completion. The application aims to enhance
efficiency, provide accurate cost estimates, and ensure timely delivery of custom furniture.

## Functional Requirements

### User Registration and Authentication

- Users (customers and admins) must be able to register, log in, and manage their profiles.
- Authentication should be handled securely.

### Order Placement

- Customers can place orders for custom furniture by providing specifications and preferences.
- The system should collect detailed information about the furniture design.

### Cost Estimation

- The system should estimate the production time, material costs, and labor costs based on the provided specifications.
- Estimates should be accurate and consider current material prices and labor rates.

### Order Tracking

- Customers should be able to track the progress of their orders in real-time.
- Status updates should be provided at various stages of the production process.

### Inventory Management

- The system should manage inventory levels for materials.
- Alerts should be generated when materials are low or need replenishment.

### Admin Panel

- Admins should have access to a dashboard to manage orders, update production status, and oversee inventory.
- Reporting tools for analyzing production efficiency and costs.

## Non-Functional Requirements

### Performance

- The application should be responsive and handle multiple simultaneous users efficiently.

### Scalability

- The system should be scalable to accommodate growing numbers of users and orders.

### Security

- User data and transactions must be securely handled.
- The system should comply with industry-standard security practices.

### Reliability

- The application should have high availability, targeting 99.9% uptime.
- Data backup and recovery mechanisms should be in place.

### Usability

- The user interface should be intuitive and easy to navigate for both customers and admins.

## Technologies and Their Applications

### Backend

- **Node.js**: As the application server, handling business logic.
- **Express.js**: For creating RESTful APIs and middleware to manage authentication and other backend functions.

### Database

- **PostgreSQL**: Relational database for storing information about users, projects, and orders.

### DevOps

- **Docker**: For containerizing the application, facilitating deployment and management.

### Security

- **JWT (JSON Web Tokens)**: For securely transmitting information between parties.

## Database Documentation

The database schema, initialization process, and detailed documentation about the database structure can be found in the [Database Documentation](database/README.md).


## REST API Endpoints

For detailed information on REST API endpoints, including requests, responses, and status codes, refer to the [API Documentation](./backend/src/api/v1/README.md).

## Testing and CI/CD

For detailed information on testing strategies, tools, and CI/CD integration, refer to the [Testing Documentation](./backend/src/tests/README.md).


## Project Structure
```
backend/
├── src/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── controllers/
│   │   │   │   ├── userController.js
│   │   │   │   ├── elementController.js
│   │   │   │   ├── projectController.js
│   │   │   │   ├── categoryController.js
│   │   │   │   ├── colorController.js
│   │   │   │   ├── adminController.js
│   │   │   ├── middleware/
│   │   │   │   ├── authMiddleware.js
│   │   │   │   ├── paramsValidatorMiddleware.js
│   │   │   ├── repositories/
│   │   │   │   ├── userRepository.js
│   │   │   │   ├── elementRepository.js
│   │   │   │   ├── projectRepository.js
│   │   │   │   ├── categoryRepository.js
│   │   │   │   ├── colorRepository.js
│   │   │   ├── routes/
│   │   │   │   ├── userRoutes.js
│   │   │   │   ├── elementRoutes.js
│   │   │   │   ├── projectRoutes.js
│   │   │   │   ├── categoryRoutes.js
│   │   │   │   ├── adminRoutes.js
│   │   │   ├── services/
│   │   │   │   ├── userService.js
│   │   │   │   ├── elementService.js
│   │   │   │   ├── projectService.js
│   │   │   │   ├── categoryService.js
│   │   │   │   ├── colorService.js
│   │   │   │   ├── projectCalculationService.js
│   │   │   ├── constants/
│   │   │   │   ├── paramsConstants.js
│   │   │   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── helpers/
│   │   ├── customJWT/
│   │   │   ├── jwtHelper.js
│   ├── tests/ 
│   │   ├── controllers/
│   │   │   ├── userController.test.js
│   │   │   ├── elementController.test.js
│   │   │   ├── projectController.test.js
│   │   │   ├── categoryController.test.js
│   │   │   ├── colorController.test.js
│   │   │   ├── adminController.test.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.test.js
│   │   │   ├── paramsValidatorMiddleware.test.js
│   │   ├── repositories/
│   │   │   ├── userRepository.test.js
│   │   │   ├── elementRepository.test.js
│   │   │   ├── projectRepository.test.js
│   │   │   ├── categoryRepository.test.js
│   │   │   ├── colorRepository.test.js
│   │   ├── routes/
│   │   │   ├── userRoutes.test.js
│   │   │   ├── elementRoutes.test.js
│   │   │   ├── projectRoutes.test.js
│   │   │   ├── categoryRoutes.test.js
│   │   │   ├── adminRoutes.test.js
│   │   ├── services/
│   │   │   ├── userService.test.js
│   │   │   ├── elementService.test.js
│   │   │   ├── projectService.test.js
│   │   │   ├── categoryService.test.js
│   │   │   ├── colorService.test.js
│   │   │   ├── projectCalculationService.test.js
│   ├── server.js
├── .env
├── .gitignore
├── Dockerfile

database/
├── README.md
├── schema.sql

.env
README.md
docker-compose.yml
```
## Setup and Installation

To set up and run the application, follow these steps:

1. **Clone the Repository:**

   Clone the project repository from GitHub to your local machine.

   ```bash
   git clone https://github.com/krepi/furnishcrafts
   cd furnishcrafts
    ```
2. **Environment Configuration:**
 
To generate a JWT secret token, use the `crypto.js` file located in the `backend/src/helpers` folder. This will allow you to create a secure token for authentication purposes.
```bash
node backend/src/helpers/crypto.js

```
Create a .env file in the root directory and in the backend directory, based on the .env.example files provided.
```bash
# .env (root directory)
DB_MAIN_USER=your_db_username
DB_MAIN_PASSWORD=your_db_password
DB_MAIN_NAME=furnishcrafts

# .env (backend directory)
DB_CONTAINER_NAME=furnishcrafts_database
DB_HOST=database
DB_PORT=5432
DB_NAME=furnishcrafts
DB_USER=your_db_username
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
```
3. **Start the Application Using Docker:**

Use Docker Compose to build and start the application. This command will start the  backend, and database services defined in the docker-compose.yml file.
```bash
docker-compose up -d
```
4. **Access the Application:**


The backend API will be accessible at http://localhost:3001.



### Loading Mocked Data into PostgreSQL Database

If you want to load data from the `mockedData.sql` file into your PostgreSQL database without modifying the `docker-compose.yml` file, follow the steps below:

1. **Start the containers: (if not started!!)**

    ```bash
    docker-compose up -d
    ```

2. **Check the name of the database container:**

    ```bash
    docker ps
    ```

    Ensure that the database container is running and note its name (e.g., `furnishcrafts_database`).

3. **Copy the `mockedData.sql` file to the database container:**

    ```bash
    docker cp database/mockedData.sql furnishcrafts_database:/mockedData.sql
    ```

4. **Access the database container:**

    ```bash
    docker exec -it furnishcrafts_database bash
    ```

5. **Load the data into the database:**

    Inside the container, run `psql` and load the data from the file:

    ```bash
    psql -U furnish -d furnishcrafts -f /mockedData.sql
    ```

By following these steps, you can easily load the mocked data into your PostgreSQL database. You can login to database as an admin and as an user.

#### Admin Credentials

To test the application with admin privileges, use the following login credentials:
- **Email:** `admin@example.com`
- **Password:** `adminpass`

#### User Credentials

To test the application with user privileges, use the following login credentials:
- **Email:** `user@example.com`
- **Password:** `userpass`


**Notes**
Ensure that Docker and Docker Compose are installed on your system.
The frontend and backend services are containerized for easy deployment and management.
Modify the environment variables as needed to suit your development environment.

## Future Enhancements

Here are some features and improvements planned for future versions of the project:

1. **Swagger Documentation**:
  - Integrate Swagger for better API documentation and easier testing.
  - Provide detailed examples of requests and responses for each endpoint.

2. **Notification System**:
  - Implement a system to notify users about changes in the status of their projects.
  - Include email notifications and possibly SMS notifications.

3. **User Interface**:
  - Develop a frontend for the application to improve user experience.
  - Ensure that the UI is responsive and user-friendly.

4. **Unit and Integration Testing**:
  - Add comprehensive unit and integration tests to ensure code reliability and stability.
  - Use tools like Jest or Mocha for testing.

5. **Discounts and Promotions**:
  - Implement advanced features for managing promotions and discounts.
  - Allow administrators to set up and manage temporary and quantity-based discounts.

6. **Performance Optimization**:
  - Optimize database queries and application performance to handle more users and data efficiently.
  - Consider implementing caching mechanisms where necessary.

7. **Scalability Improvements**:
  - Enhance the application’s scalability to support a larger user base and higher data loads.
  - Explore microservices architecture if needed.

8. **Advanced Security Features**:
  - Implement more advanced security measures, such as two-factor authentication.
  - Regularly update dependencies and perform security audits.

Adding these features will enhance the functionality, performance, and user experience of the application. They will also ensure the application remains robust and scalable as it grows.
