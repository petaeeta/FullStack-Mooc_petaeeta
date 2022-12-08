const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

console.log(process.argv.length)

const url =
  `mongodb+srv://petaeeta:${password}@cluster0.iq4su.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length<4){
  console.log("phonebook:")
  Contact
  .find({})
  .then(result => {
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
  })
}
else {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
  })

  contact
  .save()
  .then(response => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook.`)
    mongoose.connection.close()
  })
  
}