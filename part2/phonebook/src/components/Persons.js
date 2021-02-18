const Persons = ({ persons, filter, deleteHandlerCreator }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}&nbsp;
            <button onClick={deleteHandlerCreator(person)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
