import React, { useEffect, useState } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const showUpdateDialog = (existingUser) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, do you want to update the phone number?`
      )
    ) {
      const updatedEntry = { ...existingUser, number: newNumber };
      personService
        .update(updatedEntry)
        .then((updatedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          )
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
    personService
      .create(newEntry)
      .then((response) => setPersons(persons.concat(response)));

    setNewName("");
    setNewNumber("");
  };

  const deleteHandlerCreator = (person) => {
    return () => {
      const result = window.confirm(`Delete ${person.name}?`);
      if (result) {
        personService
          .deletePerson(person.id)
          .then(setPersons(persons.filter((p) => p.id !== person.id)));
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
