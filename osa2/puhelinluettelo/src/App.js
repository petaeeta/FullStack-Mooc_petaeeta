import React, { useEffect, useState } from 'react'
import Person from './Components/Person'
import AddContactForm from './Components/AddContactForm'
import Filtering from './Components/Filtering'
import Persons from './Services/Persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtering, setFiltering] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [notificationType, setNotificationType] = useState('confirmation')

  useEffect(() => {
    Persons
      .getContacts()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        setNotificationType('error')
        setErrorMessage(`Something went wrong: ${error}`)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)

      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.map((props) => props.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Would you like to replace the old number with a new one?`)) {
        const oldContact = persons.find(person => person.name === newName)
        const newContact = { ...oldContact, number: newNumber }

        Persons
          .updateContact(oldContact.id, newContact)
          .then(response => {
            setPersons(persons.map(contacts => contacts.id !== oldContact.id ? contacts : response))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotificationType('error')
            setErrorMessage(`Something went wrong: ${error}`)
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
            setPersons(persons.filter(person => person.id !== oldContact.id))
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      Persons
        .addContact(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setNotificationType('confirmation')
          setErrorMessage(
            `Contact ${newPerson.name} added successfully.`
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        })
        .catch(error => {
          setNotificationType('error')
          setErrorMessage(`Something went wrong: ${error}`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)

        })
    }
  }

  const handleDeletion = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      Persons
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(item => item.id !== id))
        })
        .catch(error => {
          setNotificationType('error')
          setErrorMessage(`Something went wrong: ${error}`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))

        })
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
      <Notification notification={notificationType} message={errorMessage}/>
      <Filtering onChangeFunction={handleFiltering} />

      <AddContactForm
        onSubmitFunction={handleSubmit}
        nameChangeHandler={nameValueChange}
        numberChangeHandler={numberValueChange}
        nameValue={newName}
        numberValue={newNumber}
      />

      <div>
        <h2>Contacts</h2>
        {contactsToShow.map(person =>
          <Person
            name={person.name}
            number={person.number}
            key={person.name}
            deleteFunction={() => handleDeletion(person.name, person.id)} />)}
      </div>
    </div>
  )

}

export default App