import Contact from "../../models/contact.js";

export async function indexContacts(request, response, next) {
  try {
    const contacts = await Contact.find();

    response.status(200).json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}
