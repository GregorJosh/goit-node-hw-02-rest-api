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

    Request: GET /api/contacts  
      
    Headers:  
    `Authorization: "Bearer {{token}}"`  
      

  - 📡 Get contact by ID:  
    
    Request: GET /api/contacts/:contactID  
  
    Headers:  
    `Authorization: "Bearer {{token}}"`  
  

  - 📡 Add new contact:  
  
    Request: POST /api/contacts  

    Headers:  
    `Authorization: "Bearer {{token}}"`  


  - 📡 Update contact by ID:  
    
    Request: PUT /api/contacts/:contactID  
  
    Headers:  
    `Authorization: "Bearer {{token}}"`  
  
  
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
      email: "user.email@host.com",
      password: "Password-1234", 
    }
    ```  
  

  - 📡 User log in:  
    Request: POST /api/users.login  
    Content-Type: application/json  
  
    Example Request Body:  
    ```json
    {
      email: "user.email@host.com",
      password: "Password-1234", 
    }
    ``` 
  
  
  - 📡 User log out:  
    Request: GET /users/logout  
    
    Headers:  
    `Authorization: "Bearer {{token}}"`  
    
  