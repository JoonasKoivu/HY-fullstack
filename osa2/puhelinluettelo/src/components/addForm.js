const AddForm = (props) => (
  <form onSubmit={props.addContact}>
    <div>
      Name: <input value={props.newName} onChange={props.handleNameChange}/>
    </div>
    <div>
      Numbers: <input value={props.newNumber} onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
export default AddForm