const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Contact = require('./models/contact')


app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

app.get('/api/persons', (request, response) => {
  Contact
    .find({})
    .then(contacts => {
      response.json(contacts)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact){
        response.json(contact)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const amount = Contact.length
  response.send(`<div>Phonebook has info for ${amount} people</div><div>${new Date()}</div>`)
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!body.name){
    return response.status(400).json({
      error: 'Name is missing'
    })
  }
  if(!body.number){
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  const newPerson = new Contact({
    name: body.name,
    number: body.number
  })

  newPerson
    .save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request,response,next) => {
  const body = request.body

  const contact = {
    number: body.number
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError'){
    return response.status(406).send(error)
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})