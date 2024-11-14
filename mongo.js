const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://GarvinChimone:${password}@persons.hf8ny.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Persons`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model("Person", personSchema)

if (name && number) {
  const person = new Person({
    name,
    number
  })

  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((error) => {
      console.error("Error saving the person", error)
      mongoose.connection.close()
    })
} else {
  Person.find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch((error) => {
      console.error("Error fething the person", error)
      mongoose.connection.close()
    })
}
