import React, { useState } from 'react'
import Person from './Components/Person'
import AddContactForm from './Components/AddContactForm'
import Filtering from './Components/Filtering'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtering, setFiltering] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()

    if(persons.map((props) => props.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const nameValueChange = (event) => {
    setNewName(event.target.value)
  }

  const numberValueChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    setFiltering(event.target.value)
    filtering.trim() === '' ? setShowAll(true) : setShowAll(false)
  }
  const contactsToShow = showAll ? persons : persons.filter((props) => props.name.toLowerCase().includes(filtering.toLowerCase()))
  return (
    <div>
      <h1>Phonebook</h1>

      <Filtering onChangeFunction={handleFiltering}/>

      <AddContactForm 
      onSubmitFunction={handleSubmit} 
      nameChangeHandler={nameValueChange}
      numberChangeHandler={numberValueChange}
      nameValue={newName}
      numberValue={newNumber}
      />

      <div>
        <h2>Contacts</h2>
        {contactsToShow.map((props) => <Person name={props.name} number={props.number} key={props.name}/>)}
      </div>
    </div>
  )

}

export default App