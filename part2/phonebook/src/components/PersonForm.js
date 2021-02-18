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

export default PersonForm;