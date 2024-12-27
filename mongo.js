const mongoose = require("mongoose");

const [password, name, number] = process.argv.slice(2);

// Connect to MongoDB
const dbConnection = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://asx:${password}@phonebook.j2sjy.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Phonebook`
    );
    console.log(`Connected to MongoDB: ${db.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

// Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// Create a sample contact
const createSampleContact = async () => {
  const anna = new Contact({ name: name, phone: number });
  try {
    await anna.save();
    console.log(`added ${name} number ${number} to phonebook`);
  } catch (error) {
    console.error(`Error creating sample contact: ${error.message}`);
  }
};

// TODO: Format the result of the contacts info
// TODO: Review when you must to close the connection to mongodb.
const getAllContacts = async () => {
  try {
    const contacts = await Contact.find({});
    console.log("Phonebook: ", contacts);
  } catch (error) {
    console.error(`Error getting contacts: ${error.message}`);
  } finally {
    mongoose.connection.close();
  }
};
// Connect and Test
dbConnection();
createSampleContact();
getAllContacts();
module.exports = { Contact, dbConnection };
