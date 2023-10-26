import * as contactsModel from "../../models/contacts.js";
import { contactSchema } from "../../validators/contactValidator.js";

export async function updateContact(request, response, next) {
  const { contactId } = request.params;

  if (Object.keys(request.body).length === 0) {
    response.status(400).json({
      status: 400,
      message: "missing fields",
    });

    return;
  }

  try {
    const validatedBody = await contactSchema.validateAsync(request.body);

    try {
      const updatedContact = await contactsModel.updateContact(
        contactId,
        validatedBody
      );

      response.status(200).json({
        status: 200,
        data: updatedContact,
      });
    } catch (error) {
      response.status(404).json({
        status: 404,
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
