[Back to Main README](../../../../README.md)


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

#### GET /api/v1/elements (TODO)

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

#### POST /api/v1/projects

- Create a new project for a user.

**Request:**

```bash
curl -X 'POST'   '/api/v1/projects'   
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
curl -X 'GET'   '/api/v1/projects'   
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
curl -X 'GET'   '/api/v1/projects/2'   
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
curl -X 'POST'   '/api/v1/projects/1/elements'   
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
- When the quantity is greater than or equal to the quantity in the project, the element is removed entirely

**Request:**

```bash
curl -X 'DELETE' '/api/v1/projects/1/elements/1' 
  -H 'Authorization: Bearer jwt_token_here' 
  -d '{
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
[Back to Main README](../../../../README.md)