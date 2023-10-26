import fs from "fs/promises";
import path from "path";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  if (!contacts) {
    throw new Error("There are no contacts");
  }
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new Error("Not found.");
  }

  return contact;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  if (filteredContacts.length === contacts.length) {
    throw new Error("Not found.");
  }

  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
};

export const addContact = async (body) => {
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

export const updateContact = async (contactId, newData) => {
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
