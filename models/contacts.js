const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  if (!contacts) {
    throw new Error("\nThere are no contacts");
  }

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new Error(`\nThere is no contact with id ${contactId}`);
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  if (filteredContacts.length === contacts.length) {
    throw new Error(`Contact with ID ${contactId} not found.`);
  }

  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { id, name, email, phone } = body;
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  const contactWithSameName = contacts.find((contact) => contact.name === name);

  if (contactWithSameName) {
    throw new Error(
      `Contact with name ${name} already exists in contacts.`
    );
  }

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    throw new Error(`\nThere is no contact with id ${contactId}`);
  }

  const updatedContact = {
    ...contacts[contactIndex],
    ...body,
  };

  contacts[contactIndex] = updatedContact;
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return updatedContact[0];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};