import { listContacts } from "../../models/contacts/contacts.js";

export async function indexContacts(request, response, next) {
  try {
    const contacts = await listContacts();

    response.status(200).json({
      status: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}
