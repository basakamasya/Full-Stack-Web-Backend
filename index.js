require('dotenv').config()
const express = require('express')
//const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))
//morgan.token('requestBody', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())

app.use(express.static('build'))

//const password = process.argv[2]

/*
const generateId = () => {
  const randId = Math.ceil(Math.random() * 100000);
  return randId;
}*/

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  let date = new Date()
  let res = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
  response.send(res)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }
  /*
  if (persons.filter(person => person.name === body.name).length !== 0) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }*/
    
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})