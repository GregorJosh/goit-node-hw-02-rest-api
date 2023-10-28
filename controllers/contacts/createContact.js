import Contact from "../../models/contact.js";

export async function createContact(request, response, next) {
  try {
    const newContact = await Contact.create(request.body);

    response.status(200).json({
      status: "success",
      code: 200,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
}
