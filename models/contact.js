const mongoose = require("mongoose");

// Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
