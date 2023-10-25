const express = require("express");
const { nanoid } = require("nanoid");

const contactSchema = require("../../validators/contactValidator");

const indexContacts = require("../../controllers/contacts/indexContacts");
const getContact = require("../../controllers/contacts/getContact");
const createContact = require("../../controllers/contacts/createContact");

const {
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", indexContacts);
router.get("/:contactId", getContact);
router.post("/", createContact);

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
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      status: 400,
      message: "missing fields",
    });

    return;
  }

  try {
    const validatedBody = await contactSchema.validateAsync(req.body);

    try {
      const updatedContact = await updateContact(contactId, validatedBody);

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
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = router;
