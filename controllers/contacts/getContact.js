import Contact from "../../models/contact.js";

export async function getContact(request, response, next) {
  try {
    const { id } = request.params;
    const contact = await Contact.findById(id);

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
