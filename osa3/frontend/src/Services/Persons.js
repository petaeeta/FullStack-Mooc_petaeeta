import axios from 'axios'
const personsDB = '/api/persons/'


const getContacts = () => {
    return axios.get(personsDB).then(response => response.data)
}

const addContact = (newPerson) => {
    return axios.post(personsDB, newPerson).then(response => response.data)
}

const updateContact = (id, newPerson) => {
    return axios.put(`${personsDB}${id}`, newPerson).then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${personsDB}${id}`).then(response => response)
}

// Kääntäjä ei pitänyt siitä että default exportataan nimeämätön olio:
// Line 13:1: Assign object to a variable before exporting as module default."
// StackOverflow silkan vilppiepäilyksen pelosta: 
// https://stackoverflow.com/questions/65738988/assign-object-to-a-variable-before-exporting-as-module-default-warning
const exported = { getContacts, addContact, updateContact, deleteContact }
export default exported