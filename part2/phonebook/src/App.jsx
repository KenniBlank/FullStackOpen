import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = ""; // No need for base_url as it can be made relative

const Notification = ({ message, color }) => {
    if (message) {
        const style = {
            color: color,
            fontStyle: "bold",
            fontSize: "20px",
            marginBottom: "10px",
            background: "lightgrey",
            padding: "10px",
            border: `3px solid ${color}`,
            borderRadius: "5px",
            width: "fit-content",
        };

        return <div style={style}>{message}</div>;
    }
};

const Persons = ({ persons, filter, deletePerson }) => {
    filter = filter.toLowerCase();

    const filtered = persons.filter((personDetail) =>
        personDetail.name.toLowerCase().includes(filter),
    );

    return (
        <>
            {filtered.map((personDetail) => (
                <div key={personDetail.id}>
                    {personDetail.name} {personDetail.number}
                    <button onClick={() => deletePerson(personDetail)}>
                        delete
                    </button>
                </div>
            ))}
        </>
    );
};

const Filter = ({ value, change }) => {
    return (
        <>
            filter shown with: <input value={value} onChange={change} />
        </>
    );
};

const PersonForm = (props) => {
    return (
        <form>
            <div>
                name:{" "}
                <input value={props.newName} onChange={props.newNameChange} />
            </div>
            <div>
                number:{" "}
                <input
                    value={props.newNumber}
                    onChange={props.newNumberChange}
                />
            </div>
            <div>
                <button type="submit" onClick={props.addPerson}>
                    add
                </button>
            </div>
        </form>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/persons`)
            .then((response) => setPersons(response.data));
    }, []);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setFilterValue] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationColor, setNotificationColor] = useState("");

    const deletePerson = (personDetail) => {
        if (window.confirm(`Delete ${personDetail.name}`)) {
            axios
                .delete(`${BASE_URL}/api/persons/${personDetail.id}`)
                .then((response) => {
                    if (response.status == 204) {
                        let personsUpdated = persons.filter(
                            (person) => person.id !== personDetail.id,
                        );
                        setPersons(personsUpdated);
                    }
                })
                .catch(() => {
                    setNotificationColor("red");
                    setNotificationMessage(
                        `Information of ${personDetail.name} has already been removed from server`,
                    );

                    let personsUpdated = persons.filter(
                        (person) => person.id !== personDetail.id,
                    );
                    setPersons(personsUpdated);
                });
        }
    };

    const addPerson = (event) => {
        event.preventDefault();

        const newPerson = {
            name: newName,
            number: newNumber,
        };

        const result = persons.filter((personDetail) =>
            personDetail.name.toLowerCase().includes(newName.toLowerCase()),
        );

        if (result.length === 1) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with new one?`,
                )
            ) {
                console.log(result[0]);
                axios
                    .put(`${BASE_URL}/api/persons/${result[0].id}`, newPerson)
                    .then((response) => {
                        let personsUpdated = persons.filter((person) => {
                            return person.id !== response.data.id;
                        });
                        setNotificationMessage(
                            `Updated ${newPerson.name}'s Contact Number`,
                        );
                        setNotificationColor("green");

                        setTimeout(() => {
                            setNotificationMessage("");
                        }, 5000);
                        setPersons([...personsUpdated, response.data]);
                    });
            }
        } else if (result.length == 0) {
            axios
                .post(`${BASE_URL}/api/persons`, newPerson)
                .then((response) => {
                    setNotificationMessage(`Added "${response.data.name}"`);
                    setNotificationColor("green");

                    setTimeout(() => {
                        setNotificationMessage("");
                    }, 5000);
                    setPersons([...persons, response.data]);
                })
                .catch((error) => {
                    setNotificationMessage(error.response.data.error);
                    setNotificationColor("red");

                    setTimeout(() => {
                        setNotificationMessage("");
                    }, 5000);
                });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                message={notificationMessage}
                color={notificationColor}
            />

            <Filter
                change={(e) => setFilterValue(e.target.value)}
                value={newFilter}
            />

            <h2>add a new</h2>

            <PersonForm
                newName={newName}
                newNameChange={(e) => setNewName(e.target.value)}
                newNumber={newNumber}
                newNumberChange={(e) => setNewNumber(e.target.value)}
                addPerson={addPerson}
            />

            <h2>Numbers</h2>

            <Persons
                persons={persons}
                filter={newFilter}
                deletePerson={deletePerson}
            />
        </div>
    );
};

export default App;
