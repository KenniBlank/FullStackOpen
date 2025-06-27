const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log(
        "Usecase: node *.js <db-password> Phonebook-name Phoenbook-number \n\t or node *.js <db-password>",
    );
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const URL = `mongodb+srv://Birajtwr:${password}@cluster0.ezrovar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(URL);

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Phonebook = mongoose.model("phonebooks", phonebookSchema);

if (name && number) {
    const newPhoneBookEntry = new Phonebook({
        name: name,
        number: number,
    });

    newPhoneBookEntry.save().then((result) => {
        console.log(
            `added ${result.name} number ${result.number} to phonebook`,
        );
        mongoose.connection.close();
    });
} else {
    Phonebook.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((entry) => {
            console.log(entry.name + " " + entry.number);
        });
        mongoose.connection.close();
    });
}
