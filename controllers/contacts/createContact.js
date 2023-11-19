import Contact from "#models/contact.js";

export async function createContact(request, response, next) {
  try {
    const { name } = request.body;
    const existedContact = await Contact.findOne(
      { name: { $regex: `^${name}$`, $options: "i" } },
      { name: 1 }
    ).lean();

    if (existedContact) {
      return response.status(409).json({
        status: "Conflict",
        code: 409,
        message: "There is an contact with name " + name,
      });
    }

    const newContact = await Contact.create(request.body);

    response.status(201).json({
      status: "Success",
      code: 201,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
}
