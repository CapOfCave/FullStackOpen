import React, { useState } from "react";

const Filter = ({ filter, filterChangeHandler }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={filterChangeHandler} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={props.submitHandler}>
        <div>
          name:&nbsp;
          <input value={props.newName} onChange={props.nameChangeHander} />
        </div>
        <div>
          number:&nbsp;
          <input value={props.newNumber} onChange={props.numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
      })
    );
    setNewName("");
    setNewNumber("");
  };

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
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;