import { nanoid  } from "nanoid";

import {contactSchema} from "../../validators/contactValidator.js";
import { addContact } from "../../models/contacts.js";

export async function createContact(request, response, next) {
  const { name, email, phone } = request.body;

  const requiredParams = {
    name,
    email,
    phone,
  };

  for (const param in requiredParams) {
    if (!request.body[param]) {
      res.status(400).json({
        status: 400,
        message: `Missing required ${param} field`,
      });

      return;
    }
  }

  const contact = {
    id: nanoid(),
    ...request.body,
  };

  try {
    const validatedContact = await contactSchema.validateAsync(contact);

    try {
      const newContact = await addContact(validatedContact);

      response.status(200).json({
        status: 200,
        data: newContact,
      });
    } catch (error) {
      response.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  } catch (error) {
    response.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}
