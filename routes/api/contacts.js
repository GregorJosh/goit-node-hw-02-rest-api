const express = require("express");
const { nanoid } = require("nanoid");

const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({
      status: 200,
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    res.status(200).json({
      status: 200,
      data: contact,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const requiredParams = {
    name,
    email,
    phone,
  };

  for (const param in requiredParams) {
    if (!req.body[param]) {
      res.status(400).json({
        status: 400,
        message: `Missing required ${param} field`,
      });

      return;
    }
  }

  const contact = {
    id: nanoid(),
    ...req.body,
  };

  try {
    const newContact = await addContact(contact);

    res.status(200).json({
      status: 200,
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(200).json({
      status: 200,
      message: "contact deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: 400,
        message: "missing fields",
      });

      return;
    }

    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json({
      status: 200,
      data: updatedContact,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
});

module.exports = router;
