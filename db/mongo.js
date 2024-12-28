require("dotenv").config();
const mongoose = require("mongoose");
const [password, name, number] = process.argv.slice(2);
// Connect to MongoDB
const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

// Create a sample contact
const createSampleContact = async () => {
  const anna = new Contact({ name: name, phone: number });
  try {
    await anna.save();
    console.log(`added ${name} number ${number} to phonebook`);
  } catch (error) {
    console.error(`Error creating sample contact: ${error.message}`);
  } finally {
    mongoose.connection.close();
  }
};

const getAllContacts = async () => {
  try {
    const contacts = await Contact.find({});
    console.log(
      "phonebook:\n" +
        contacts.map((contact) => contact.name + " " + contact.phone).join("\n")
    );
  } catch (error) {
    console.error(`Error getting contacts: ${error.message}`);
  } finally {
    mongoose.connection.close();
  }
};

if (password && !name && !number) {
  getAllContacts();
}

if (password && name && number) {
  createSampleContact();
}

module.exports = dbConnection;
