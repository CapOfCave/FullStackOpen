import React, { useEffect, useState } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, innerSetNotification] = useState(null);

  const setNotification = (notif) => {
    setTimeout(() => {
      innerSetNotification(null);
    }, 3000);
    innerSetNotification(notif);
  };

  const showUpdateDialog = (existingUser) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, do you want to update the phone number?`
      )
    ) {
      const updatedEntry = { ...existingUser, number: newNumber };
      personService
        .update(updatedEntry)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setNotification({
            message: `Updated phone number of ${updatedPerson.name}.`,
            type: "success",
          });
        })
        .catch((e) =>
          setNotification({
            message: `${updatedEntry.name} was already removed from the server.`,
            type: "error",
          })
        );
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const existingUsers = persons.filter((person) => person.name === newName);
    if (existingUsers.length !== 0) {
      showUpdateDialog(existingUsers[0]);
      return;
    }
    const newEntry = {
      name: newName,
      number: newNumber,
    };
    personService.create(newEntry).then((response) => {
      setPersons(persons.concat(response));
      setNotification({ message: `Added ${response.name}.`, type: "success" });
    });

    setNewName("");
    setNewNumber("");
  };

  const deleteHandlerCreator = (personToDelete) => {
    return () => {
      const result = window.confirm(`Delete ${personToDelete.name}?`);
      if (result) {
        personService.deletePerson(personToDelete.id).then((deletedPerson) => {
          setPersons(
            persons.filter((person) => person.id !== deletedPerson.id)
          );
          setNotification({
            message: `Deleted ${personToDelete.name}.`,
            type: "success",
          });
        });
      }
    };
  };

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const nameChangeHander = (event) => setNewName(event.target.value);
  const numberChangeHandler = (event) => setNewNumber(event.target.value);
  const filterChangeHandler = (event) => setFilter(event.target.value);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification data={notification} />
      <Filter filter={filter} filterChangeHandler={filterChangeHandler} />
      <PersonForm
        submitHandler={submitHandler}
        newName={newName}
        nameChangeHander={nameChangeHander}
        newNumber={newNumber}
        numberChangeHandler={numberChangeHandler}
      />
      <Persons
        persons={persons}
        filter={filter}
        deleteHandlerCreator={deleteHandlerCreator}
      />
    </div>
  );
};

export default App;
