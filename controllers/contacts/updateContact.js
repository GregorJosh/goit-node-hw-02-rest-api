import Contact from "../../models/contact.js";

export async function updateContact(request, response, next) {
  const { params, body } = request;
  const { id } = params;

  if (Object.keys(body).length === 0) {
    response.status(400).json({
      status: 400,
      message: "Missing fields",
    });

    return;
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, body);

    response.status(200).json({
      status: 200,
      data: updatedContact,
    });
  } catch (error) {
    response.status(404).json({
      status: 404,
      message: error.message,
    });
  }
}
