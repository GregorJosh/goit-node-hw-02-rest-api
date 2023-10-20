const express = require("express");
const nanoid = require("nanoid");

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

    res.json({
      status: 200,
      data: contacts,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    res.json({
      status: 200,
      data: contact,
    });
  } catch (error) {
    res.json({
      status: 404,
      data: error,
    });
  }
});

router.post("/", async (req, res, next) => {
  for (const [name, value] of req.body) {
    if (!value) {
      res.json({
        status: 400,
        message: `Missing required ${field} field`,
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

    res.json({
      status: 200,
      data: newContact,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
