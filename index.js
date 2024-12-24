const express = require("express");
const app = express();
const PORT = 3001;
let contacts = [
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
  {
    id: "5",
    name: "Delete Example",
    number: "39-23-6423122",
  },
];

// Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));

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
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  res.status(200).json(contact);
});

// Delete single contact
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  contacts = contacts.filter((contact) => contact.id !== id);
  res.status(200).json(contacts);
});

// Add a new user
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }
  if (contacts.some((contact) => contact.name === name)) {
    return res.status(400).json({ error: "Contact already exists" });
  }

  const id = Math.floor(Math.random() * 100) + 1;
  contacts.push({ id: id.toString(), name: name, number: number });
  res.status(200).json(contacts);
});

// Server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
