const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :body'))
app.use(cors())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

let phonebookArr = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebookArr)
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${phonebookArr.length} people</p>
        <p>${Date(Date.now())}</p>
        `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebookArr.find(p => p.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phonebookArr = phonebookArr.filter(person => person.id !== id) 

  response.status(204).end()
})

const randomId = (length = 8) => {
  return Math.random().toString(36).substring(2, length+2);
};

app.post('/api/persons/', (request, response) => {
  let newId = randomId(10)
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'please enter a name or a number'
    })
  }

  const uniqueName = phonebookArr.find(person => person.name === body.name)
  const nameExists = uniqueName !== undefined
  if(nameExists) {
    return response.status(400).json({
      error: 'please enter a unique name'
    })
  }

  const person = {
    id: newId,
    name: body.name,
    number: body.number
  }

  phonebookArr = phonebookArr.concat(person)
  response.json(phonebookArr)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})