import Contact from "#models/contact.js";

export async function removeContact(request, response, next) {
  try {
    const { id } = request.params;
    await Contact.findByIdAndDelete(id);

    response.status(200).json({
      status: "Success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
}
