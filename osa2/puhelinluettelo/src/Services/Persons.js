import axios from 'axios'
const personsDB = 'http://localhost:3001/persons'


const getContacts = () => {
    return axios.get(personsDB).then(response => response.data)
}

const addContact = (newPerson) => {
    return axios.post(personsDB, newPerson).then(response => response.data)
}

// Kääntäjä ei pitänyt siitä että default exportataan nimeämätön olio:
// Line 13:1: Assign object to a variable before exporting as module default."
// StackOverflow silkan vilppiepäilyksen pelosta: 
// https://stackoverflow.com/questions/65738988/assign-object-to-a-variable-before-exporting-as-module-default-warning
const exported = { getContacts, addContact}
export default exported