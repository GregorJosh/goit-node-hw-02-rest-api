# Contacts Manager REST API  
  
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
  
{  
  name: "Contact Name",  
  email: "email.address@website.com",  
  phone: "123 456 789",  
}  
  
