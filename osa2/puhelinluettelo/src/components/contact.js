const Contact = ({person, deleteContact}) => {
    return(
        <p className='contact' >
            {person.name} {person.number}
            <button onClick={() => deleteContact(person)}>Delete</button>
        </p>
    )
}

export default Contact