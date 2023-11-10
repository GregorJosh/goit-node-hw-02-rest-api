# Contacts Manager REST API  

REST API for Contacts Manager web application, written in Javascript. 
This application is executing in Node.JS runtime environment and use MongoDB for db system.

Console command for run this app:  
```shell
npm start
```  
  
## Endpoints:  

### Managing Contacts:
  
List contacts:  
  - GET /api/contacts  
  
Get contact by ID:
  - GET /api/contacts/:contactID  
  
Add new contact:  
  - POST /api/contacts  
      
Update contact by ID:
  - PUT /api/contacts/:contactID  
    
Delete contact by ID:
  - DELETE /api/contacts/:contactID  
  
### User Access Control:  
  
Create new user:
  - POST /api/users/signup  
  
    Content-Type: application/json  

    Body:  
    ```json
    {
      email: "user.email@host.com",
      password: "Password-1234", 
    }
    ```
    
## Data format for "Add new contact" and "Update contact by ID" requests:  
  - JSON with body contains fields: name, email and phone.  

For example:  
  
```json
{
  name: "Contact Name",  
  email: "email.address@website.com",  
  phone: "123 456 789",  
}
```  