import * as contactsModel from "../../models/contacts.js";

export async function removeContact(request, response, next) {
  try {
    const { contactId } = request.params;
    await contactsModel.removeContact(contactId);

    response.status(200).json({
      status: 200,
      message: "contact deleted",
    });
  } catch (error) {
    response.status(404).json({
      status: 404,
      message: error.message,
    });
  }
}
