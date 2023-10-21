const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  if (!contacts) {
    throw new Error("There are no contacts");
  }
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new Error("Not found.");
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  if (filteredContacts.length === contacts.length) {
    throw new Error("Not found.");
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
    throw new Error(`Contact with name ${name} already exists in contacts`);
  }

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, newData) => {
  const contacts = await listContacts();
  const updatedContact = await getContactById(contactId);
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  for (const key in newData) {
    updatedContact[key] = newData[key];
  }

  contacts[contactIndex] = updatedContact;

  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
