import Contact from "../../models/contact.js";

export async function removeContact(request, response, next) {
  try {
    const { id } = request.params;
    await Contact.findByIdAndDelete(id);

    response.status(200).json({
      status: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    response.status(404).json({
      status: 404,
      message: error.message,
    });
  }
}
