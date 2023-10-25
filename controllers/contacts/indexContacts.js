const listContacts = require("../../models/contacts");

async function indexContacts(request, response, next) {
  try {
    const contacts = await listContacts();

    response.status(200).json({
      status: 200,
      data: contacts,
    });
  } catch (error) {
    response.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

module.exports = indexContacts;
