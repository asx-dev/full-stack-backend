const express = require("express");
const app = express();
const PORT = 3001;
const contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Get contacts
app.get("/api/persons", (req, res) => {
  res.status(200).json(contacts);
});
// Get info and Date
app.get("/info", (req, res) => {
  const date = new Date();
  const htmlElement = `<p>Phonebook has info for ${contacts.length} people</p><p>${date}</p>`;
  res.status(200).send(htmlElement);
});
// Get single contact
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.filter((contact) => contact.id === id);
  contact ? res.status(200).json(contact) : res.status(404).end();
});

// Server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
