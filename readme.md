# 📇 Contacts Manager REST API

REST API for Contacts Manager web application, written in Javascript.
This application is executing in Node.JS runtime environment and use MongoDB for db system.

⌨️ Console command for run this app:

```shell
npm start
```

## 🗝️ Endpoints

### 👥 Managing Contacts:

- 📡 List contacts:

  Request: GET /api/contacts?page=1&limit=10&favorite=true

  Query Params:

  - page - Page number (number)
  - limit - Contacts limit per page (number)
  - favorite - favorite contacts filter (true/false)

  Headers:  
  `Authorization: "Bearer {{token}}"`

- 📡 Get contact by ID:

  Request: GET /api/contacts/:contactID

  Headers:  
  `Authorization: "Bearer {{token}}"`

- 📡 Add new contact:

  Request: POST /api/contacts  
  Content-Type: application/json

  Headers:  
  `Authorization: "Bearer {{token}}"`

  Example Request Body:

  ```json
  {
    "name": "Username",
    "phone": "123456789",
    "email": "user.email@host.com",
    "favorite": "false" // optional
  }
  ```

- 📡 Update contact by ID:

  Request: PUT /api/contacts/:contactID  
  Content-Type: application/json

  Headers:  
  `Authorization: "Bearer {{token}}"`

  Example Request Body (min. 1 field):

  ```json
  {
    "name": "Username",
    "phone": "123456789",
    "email": "user.email@host.com",
    "favorite": "false"
  }
  ```

- 📡 Update contact favorite property by ID:

  Request: PATCH /api/contacts/:contactId/favorite  
  Content-Type: application/json

  Headers:  
  `Authorization: "Bearer {{token}}"`

  Example Request Body:

  ```json
  {
    "favorite": "false"
  }
  ```

- 📡 Delete contact by ID:

  Request: DELETE /api/contacts/:contactID

  Headers:  
  `Authorization: "Bearer {{token}}"`

### 👤 User Access Control:

- 📡 Create new user:

  Request: POST /api/users/signup  
  Content-Type: application/json

  Example Request Body:

  ```json
  {
    "email": "user.email@host.com",
    "password": "Password-1234"
  }
  ```

- 📡 User log in:

  Request: POST /api/users.login  
  Content-Type: application/json

  Example Request Body:

  ```json
  {
    "email": "user.email@host.com",
    "password": "Password-1234"
  }
  ```

- 📡 User log out:

  Request: GET /users/logout

  Headers:  
  `Authorization: "Bearer {{token}}"`

- 📡 Get current user:

  Request: GET /users/current

  Headers:  
  `Authorization: "Bearer {{token}}"`
