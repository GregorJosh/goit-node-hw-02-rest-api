import Contact from "#models/contact.js";

export async function getContact(request, response, next) {
  try {
    const { id } = request.params;
    const contact = await Contact.findById(id);

    response.status(200).json({
      status: "Success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}
