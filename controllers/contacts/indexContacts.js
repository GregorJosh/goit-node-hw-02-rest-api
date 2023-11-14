import Contact from "#models/contact.js";

export async function indexContacts(request, response, next) {
  const { page, limit, favorite } = request.query;
  const numOfSkipped = (page - 1) * limit;
  const setFavorite = () => favorite && {favorite: (favorite == "true")};

  try {
    const numOfContacts = await Contact.count(setFavorite());
    const contacts = await Contact.find(setFavorite())
      .skip(numOfSkipped)
      .limit(limit);

    response.status(200).json({
      status: "Success",
      code: 200,
      page,
      count: numOfContacts,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}
