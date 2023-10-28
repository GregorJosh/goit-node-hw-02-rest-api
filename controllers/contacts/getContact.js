import { getContactById } from "../../models/contacts/contacts.js";

export async function getContact(request, response, next) {
  try {
    const { contactId } = request.params;
    const contact = await getContactById(contactId);

    response.status(200).json({
      status: 200,
      data: contact,
    });
  } catch (error) {
    response.status(404).json({
      status: 404,
      data: error.message,
    });
  }
}
