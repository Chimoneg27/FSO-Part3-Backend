const express = require('express')
const app = express()

const phonebookArr = [
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
    const singlePerson = phonebookArr.find(p => p.id === id)

    if(singlePerson) {
        response.json(singlePerson)
    } else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})