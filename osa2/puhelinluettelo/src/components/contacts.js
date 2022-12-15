import Contact from './contact'
const Contacts = ({contacts, filter, deleteContact}) => {
    const filteredPersons = contacts.filter((person) => 
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    return(
        <div>
            {filteredPersons.map(person =>
                <Contact key={person.name} person={person} deleteContact={deleteContact} />
              )}
        </div>
    )
}

export default Contacts 