import Contact from "#models/contact.js";

export const updateContactStatus = async (request, response, next) => {
  const { params, body } = request;
  const { id } = params;
  const { favorite } = body;

  if (!favorite) {
    response.status(400).json({
      status: "Error",
      code: 400,
      message: "Missing field: favorite",
    });

    return;
  }

  try {
    const contact = await Contact.findByIdAndUpdate(id, { favorite });
    contact.favorite = favorite;

    response.status(200).json({
      status: "Success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
