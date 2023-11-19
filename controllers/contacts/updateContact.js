import Contact from "#models/contact.js";

export async function updateContact(request, response, next) {
  const { params, body } = request;
  const { id } = params;

  if (Object.keys(body).length === 0) {
    response.status(400).json({
      status: "Error",
      code: 400,
      message: "Missing some fields",
    });

    return;
  }

  try {
    await Contact.findByIdAndUpdate(id, body);

    response.status(200).json({
      status: "Success",
      code: 200,
      data: { id, ...body },
    });
  } catch (error) {
    next(error);
  }
}
