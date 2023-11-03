# Contacts Manager REST API  

REST API for Contacts Manager web application, written in Javascript. 
This application is executing in Node.JS runtime environment and use MongoDB for db system.

Console command for run this app:  
```shell
npm start
```  
  
## Endpoints:  
  
List contacts:  
  - GET /contacts  
  
Get contact by ID:
  - GET /contacts/:contactID  
  
Add new contact:  
  - POST /contacts  
      
Update contact by ID:
  - PUT /contacts/:contactID  
    
Delete contact by ID:
  - DELETE /contacts/:contactID  
    
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