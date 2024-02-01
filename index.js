const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id)
        .then((contact) => {
          if (contact) {
            console.table([contact]);
          } else {
            console.log("Contact not found");
          }
        })
        .catch((error) =>
          console.log("Error retrieving contact: " + error.message)
        );
      break;

    case "add":
      addContact(name, email, phone)
        .then(() => console.log("Contact added successfully"))
        .catch((error) =>
          console.log("Error adding contact: " + error.message)
        );
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
