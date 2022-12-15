import { useState, useEffect } from 'react'
import Filter from './components/filter'
import AddForm from './components/addForm'
import Contacts from './components/contacts'
import contactService from './services/contacts'
import './index.css'
import Notification from './components/Notification'
import ErrorNotification from './components/errorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [updatedPerson, setUpdatedPerson] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        console.log("set persons on show by getAll()")
        setPersons(initialContacts)
      })
  }, [updatedPerson])

  // update name field onChange
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // update number field onChange
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    // update filter field
    setFilter(event.target.value)
    // filter shown persons based on the filter field
    //const filteredPersons = persons.filter((person) => 
    //person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    // Update value filteredPersons
    //setFilteredPersons(filteredPersons)
  }

  // On form submit add a new contact to the list of persons
  const addContact = (event) => {
    // prevent reloading the whole page
    event.preventDefault()
    // construct an object of the new person
    const personObject = {
      name: newName.trim(),
      number: newNumber,
    }
    // Checks for contact with the same name  
    if(persons.some(elem => elem.name === personObject.name)){
      
      const currentName = persons.filter((person) => person.name === personObject.name)
      const message = `${personObject.name} is already added to the phonebook, replace the old number with a new one?`
      console.log("same name id:", currentName[0].id)
      
      if(window.confirm(message)){
        contactService
          .update(currentName[0].id, personObject)
          .then((returnedContact) => {
            const updatedList = persons.map((person) => person.id !== personObject.id ? person : returnedContact)
            setPersons(updatedList)
            setUpdatedPerson(returnedContact)
            setMessage(`${returnedContact.name} number has been updated to ${returnedContact.number}`)
            setTimeout(()=>{
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error)
          setTimeout(()=>{
            setErrorMessage(null)
          }, 5000)
        })
      } else {
        setNewNumber('')
        setNewName('')
      }
      
    } else {
      contactService
        .create(personObject)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact))
          setMessage(
            `${returnedContact.name} has been added`
          )
          setTimeout(()=>{
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log("personservice error: ", error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(()=>{
            setErrorMessage(null)
          }, 5000)
        })
    }
  }
  const deleteContact = person => {
    if(window.confirm(`Delete ${person.name}?`)){
      console.log(person)
      contactService.deleteContact(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    } else {
      console.log("Chose not to delete")
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage}/>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h2>Add a new contact</h2>
      <AddForm 
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Contacts 
        contacts={persons}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  )

}

export default App
