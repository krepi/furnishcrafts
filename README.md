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
- [REST API Endpoints](#rest-api-endpoints)
  - [User Registration and Authentication](#user-registration-and-authentication-1)
  - [Elements Management](#elements-management)
  - [Projects Management](#projects-management)
  - [Categories Management](#categories-management)
  - [Colors Management](#colors-management)
  - [Admin Management](#admin-management)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Future Enhancements](#future-enhancements)

## Admin Credentials and JWT Secret

### Admin Credentials
To test the application with admin privileges, use the following login credentials:
- **Email:** `admin@example.com`
- **Password:** `adminpass`

### JWT Secret
To generate a JWT secret token, use the `crypto.js` file located in the `src/helpers` folder. This will allow you to create a secure token for authentication purposes.
```bash
node src/helpers/crypto.js

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

## REST API Endpoints

### User Registration and Authentication

#### POST /api/v1/auth/register

- Register a new user.

**Request:**

```bash
curl -X 'POST'   '/api/v1/auth/register'   -H 'Content-Type: application/json'   -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "secret"
  
  }'
```

**Response:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "hashed secret"
}
```

#### POST /api/v1/auth/login

- Authenticate a user.

**Request:**

```bash
curl -X 'POST'   '/api/v1/auth/login'   
   -H 'Content-Type: application/json' 
   -d '{
    "email": "john.doe@example.com",
    "password": "secret"
  }'
```

**Response:**

```json
{
  "token": "jwt_token_here"
}
```
**Status Codes:**
- 201 Created: User successfully registered.
- 400 Bad Request: Missing or invalid input.

### Elements Management

#### POST /api/v1/elements

- Create a new element (admin only).

**Request:**

```bash
curl -X 'POST'   '/api/v1/elements'   
-H 'Content-Type: application/json'   
-H 'Authorization: Bearer jwt_token_here'   
-d '{
    "name": "Table Leg",
    "width": 5.0,
    "height": 70.0,
    "depth": 5.0,
    "material": "Wood",
    "price": 10.0,
    "stock": 100,
    "categoryId": 1,
    "colorId": 2
  }'
```

**Response:**

```json
{
  "id": 1,
  "name": "Table Leg",
  "width": 5.0,
  "height": 70.0,
  "depth": 5.0,
  "material": "Wood",
  "price": 10.0,
  "stock": 100,
  "categoryId": 1,
  "colorId": 2
}
```

#### GET /api/v1/elements

- Get a list of elements with optional filtering.

**Request:**

```bash
curl -X 'GET'   '/api/v1/elements?categoryId=1&colorId=2'   
-H 'Authorization: Bearer jwt_token_here'
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Table Leg",
    "width": 5.0,
    "height": 70.0,
    "depth": 5.0,
    "material": "Wood",
    "price": 10.0,
    "stock": 100,
    "categoryId": 1,
    "colorId": 2
  }
]
```

#### GET /api/v1/elements/:id

- Get details of an element by ID.

**Request:**

```bash
curl -X 'GET'   '/api/v1/elements/1'   
-H 'Authorization: Bearer jwt_token_here'
```

**Response:**

```json
{
  "id": 1,
  "name": "Table Leg",
  "width": 5.0,
  "height": 70.0,
  "depth": 5.0,
  "material": "Wood",
  "price": 10.0,
  "stock": 100,
  "categoryId": 1,
  "colorId": 2
}
```

### Projects Management

#### POST /api/v1//projects

- Create a new project for a user.

**Request:**

```bash
curl -X 'POST'   '/api/v1/users/1/projects'   
-H 'Content-Type: application/json'   
-H 'Authorization: Bearer jwt_token_here'   
-d '{
    "name": "New Project",
    "start_date: "2024-01-01"
    
  }'
```

**Response:**

```json
{
  "id": 1,
  "user_id": 1,
  "name": "New Project",
  "start_date": "2024-01-01T00:00:00.000Z",
  "status": "open",
  "to_share": false

}

```

#### GET /api/v1/projects

- Get a list of projects for a user.

**Request:**

```bash
curl -X 'GET'   '/api/v1/users/1/projects'   
-H 'Authorization: Bearer jwt_token_here'
```

**Response:**

```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "New Project",
    "start_date": "2024-01-01T00:00:00.000Z",
    "status": "open",
    "to_share": false
  }
]

```

#### GET /api/v1/projects/:projectId

- Get details of a project for a user by project ID.

**Request:**

```bash
curl -X 'GET'   '/api/v1/users/1/projects/2'   
-H 'Authorization: Bearer jwt_token_here'
```

**Response:**

```json
{
  "id": 2,
  "user_id": 2,
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": null,
  "status": "open",
  "to_share": false,
  "name": "My first project",
  "elements": [
    {
      "element_id": 1,
      "quantity": 15
    },
    {
      "element_id": 3,
      "quantity": 5
    },
    {
      "element_id": 2,
      "quantity": 1
    },
    {
      "element_id": 8,
      "quantity": 10
    }
  ],
  "totalCost": 657.5,
  "totalTime": 1160,
  "outOfStock": []
}
```
#### GET /api/v1/projects/:projectId/details

- Get details of a project for a user by project ID.

**Request:**

```bash
curl -X 'GET'   '/api/v1/users/1/projects/2/details'   
-H 'Authorization: Bearer jwt_token_here'
```

**Response:**

```json
{
  "id": 2,
  "user_id": 2,
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": null,
  "status": "open",
  "to_share": false,
  "name": "My first project",
  "elements": [
    {
      "element_id": 1,
      "quantity": 15,
      "name": "Short Leg",
      "color": 1,
      "category": 1,
      "price": "10.00",
      "installation_cost": "2.00",
      "installation_time": {
        "minutes": 30
      }
    },
    {
      "element_id": 2,
      "quantity": 1,
      "name": "Cabinet Door",
      "color": 2,
      "category": 2,
      "price": "25.00",
      "installation_cost": "5.00",
      "installation_time": {
        "hours": 1
      }
    },
    {
      "element_id": 3,
      "quantity": 5,
      "name": "Round Handle",
      "color": 3,
      "category": 3,
      "price": "5.00",
      "installation_cost": "0.50",
      "installation_time": {
        "minutes": 10
      }
    },
    {
      "element_id": 8,
      "quantity": 10,
      "name": "Wood Panel",
      "color": 3,
      "category": 8,
      "price": "35.00",
      "installation_cost": "7.00",
      "installation_time": {
        "hours": 1,
        "minutes": 30
      }
    }
  ],
  "purchaseCost": 550,
  "installationCost": 107.5,
  "totalCost": 657.5,
  "totalTime": 1160,
  "outOfStock": []
}
```
#### POST /api/v1/projects/:projectId/elements

- Add an element to an existing project.

**Request:**

```bash
curl -X 'PUT'   '/api/v1/projects/1/add-element'   
-H 'Content-Type: application/json'   
-H 'Authorization: Bearer jwt_token_here'   
-d '{
    "elementId": 1,
    "quantity": 4
  }'
```

**Response:**

```json
{
  "id": 1,
  "user_id": 1,
  "name": "New Project",
  "start_date": "2024-01-01T00:00:00.000Z",
  "status": "open",
  "to_share": false,
  "elements": [
    {
      "element_id": 1,
      "quantity": 15
    }
  ]
}
```

#### DELETE /api/v1/projects/:projectId/elements/:elementId

- Remove element from project

**Request:**

```bash
curl -X 'DELETE' '/api/v1/projects/1/elements/1' -H 'Authorization: Bearer jwt_token_here' -d '{
    "quantity": 5
}'

```

**Response:**

```json
{
  "message": "Element quantity updated in project"
}

```
#### POST /api/v1/projects/:projectId/close
- Close project and update stock

**Request:**

```bash
curl -X 'POST' '/api/v1/projects/1/close' -H 'Authorization: Bearer jwt_token_here'

```
***Response***
```json
{
  "message": "Project closed and stock updated"
}

```
### Categories Management

#### POST /api/v1/categories

- Create a new category (admin only).

**Request:**

```bash
curl -X 'POST'   '/api/v1/categories'   
-H 'Content-Type: application/json'   
-H 'Authorization: Bearer jwt_token_here'   
-d '{
    "name": "Table Legs"
  }'
```

**Response:**

```json
{
  "id": 1,
  "name": "Table Legs"
}
```

#### GET /api/v1/categories

- Get a list of categories.

**Request:**

```bash
curl -X 'GET'   '/api/v1/categories'   
-H 'Authorization: Bearer jwt_token_here'
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Table Legs"
  }
]
```

### Colors Management

#### POST /api/v1/colors

- Create a new color (admin only).

**Request:**

```bash
curl -X 'POST'   '/api/v1/colors'   
-H 'Content-Type: application/json'   
-H 'Authorization: Bearer jwt_token_here'   
-d '{
    "name": "Black"
  }'
```

**Response:**

```json
{
  "id": 1,
  "name": "Black"
}
```

#### GET /api/v1/colors

- Get a list of colors.

**Request:**

```bash
curl -X 'GET'   '/api/v1/colors'   
-H 'Authorization: Bearer jwt_token_here'
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Black"
  }
]
```

### Admin Management ###

#### GET /api/v1/admin/users

- Get all users (admin only).

**Request:**

```bash
curl -X 'GET' '/api/v1/admin/users' -H 'Authorization: Bearer jwt_token_here'

```

**Response:**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "standard"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "role": "administrator"
  }
]

```
#### POST /api/v1/admin/categories

- Add a new category (admin only).

**Request:**

```bash
curl -X 'POST' '/api/v1/admin/categories' -H 'Content-Type: application/json' -H 'Authorization: Bearer jwt_token_here' -d '{
    "name": "Table Legs"
}'


```

**Response:**

```json
{
  "id": 1,
  "name": "Table Legs"
}
```

#### GET /api/v1/admin/projects

- Get all projects (admin only).

**Request:**

```bash
curl -X 'GET' '/api/v1/admin/projects' -H 'Authorization: Bearer jwt_token_here'

```

**Response:**

```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "New Project",
    "start_date": "2024-01-01T00:00:00.000Z",
    "status": "open",
    "to_share": false
  }
]
```

#### POST /api/v1/admin/elements

- Add a new element (admin only).

**Request:**

```bash
curl -X 'POST' '/api/v1/admin/elements' -H 'Content-Type: application/json' -H 'Authorization: Bearer jwt_token_here' -d '{
    "name": "Table Leg",
    "width": 5.0,
    "height": 70.0,
    "depth": 5.0,
    "material": "Wood",
    "price": 10.0,
    "stock": 100,
    "categoryId": 1,
    "colorId": 2
}'


```

**Response:**

```json
{
  "id": 1,
  "name": "Table Leg",
  "width": 5.0,
  "height": 70.0,
  "depth": 5.0,
  "material": "Wood",
  "price": 10.0,
  "stock": 100,
  "categoryId": 1,
  "colorId": 2
}

```
#### PUT /api/v1/admin/elements/:elementId

- Update an element (admin only).

**Request:**

```bash
curl -X 'PUT' '/api/v1/admin/elements/1' -H 'Content-Type: application/json' -H 'Authorization: Bearer jwt_token_here' -d '{
    "name": "Updated Table Leg",
    "width": 6.0,
    "height": 70.0,
    "depth": 6.0,
    "material": "Wood",
    "price": 12.0,
    "stock": 90,
    "categoryId": 1,
    "colorId": 2
}'


```

**Response:**

```json
{
  "id": 1,
  "name": "Updated Table Leg",
  "width": 6.0,
  "height": 70.0,
  "depth": 6.0,
  "material": "Wood",
  "price": 12.0,
  "stock": 90,
  "categoryId": 1,
  "colorId": 2
}


```
#### DELETE /api/v1/admin/elements/:elementId

- Delete an element (admin only).

**Request:**

```bash
curl -X 'DELETE' '/api/v1/admin/elements/1' -H 'Authorization: Bearer jwt_token_here'

```

**Response:**

```json
{
  "message": "Element deleted"
}


```
## Project Structure
```
backend/
├── src/
│   ├── models/
│   │   ├── userModel.js
│   │   ├── elementModel.js
│   │   ├── projectModel.js
│   │   ├── categoryModel.js
│   │   ├── colorModel.js
│   ├── repositories/
│   │   ├── userRepository.js
│   │   ├── elementRepository.js
│   │   ├── projectRepository.js
│   │   ├── categoryRepository.js
│   │   ├── colorRepository.js
│   ├── services/
│   │   ├── userService.js
│   │   ├── elementService.js
│   │   ├── projectService.js
│   │   ├── categoryService.js
│   │   ├── colorService.js
│   │   ├── projectCalculationService.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── elementController.js
│   │   ├── projectController.js
│   │   ├── categoryController.js
│   │   ├── colorController.js
│   │   ├── adminController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── elementRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── adminRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── config/
│   │   └── database.js
│   └── app.js
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
4.**Access the Application:**


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
