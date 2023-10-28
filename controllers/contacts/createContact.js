import Contact from "../../models/contact.js";

export async function createContact(request, response, next) {
  try {
    const newContact = await Contact.create(request.body);

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
}
