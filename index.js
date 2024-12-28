const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const db = require("./db/mongo");
const Contact = require("./models/contact");
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
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
morgan.token("body", (req) => {
  return JSON.stringify(req.body) || "No Body";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms  :body")
);

// Get all contacts
app.get("/api/persons", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
  }
});

// Get info
app.get("/info", (req, res) => {
  const date = new Date();
  res.status(200).send(`
    <p>Phonebook has info for ${contacts.length} people.</p>
    <p>${date}</p>
    `);
});

// Get single contact
app.get("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    res.status(200).json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(404).json("Contact don't found");
  }
});

// Delete single contact
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  contacts = contacts.filter((contact) => contact.id !== id);
  res.status(200).json(contacts);
});

// Add a new user
app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;
  try {
    const newContact = new Contact(name, number);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error creating contact");
  }
});

// TODO: Test api methods to verify the frontend is working

// Server running
const server = async () => {
  try {
    const database = await db();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error}`);
    process.exit(1);
  }
};

server();
