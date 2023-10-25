const express = require("express");

const indexContacts = require("../controllers/contacts/indexContacts");
const getContact = require("../controllers/contacts/getContact");
const createContact = require("../controllers/contacts/createContact");
const removeContact = require("../controllers/contacts/removeContact");
const updateContact = require("../controllers/contacts/updateContact");

const router = express.Router();
router.get("/", indexContacts);
router.get("/:contactId", getContact);
router.post("/", createContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);

module.exports = router;
