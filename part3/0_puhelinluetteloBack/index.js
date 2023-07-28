require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

//:method :url :status :res[content-length] - :response-time ms

morgan.token('postBody', (req) => {
  // console.log("morgan", req)
  // console.log("json", JSON.stringify(req.body))
  // console.log("methods", req.route.methods)
  if (req.route && req.route.methods.post) {
    return JSON.stringify(req.body)
  }
  if (req.route && req.route.methods.put) {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }

})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))


// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456'
//   },
//   {
//     id: 2,
//     name: 'Linda Lovelace',
//     number: '39-44-5323523'

//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345'

//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122'

//   },
//   {
//     id: 5,
//     name: 'Neato MaryJane',
//     number: '555-5455'

//   },

// ]



app.get('/', (req, res) => {
  res.send('<h1>😲</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    if (person.length === 1) {
      person = [person]
    }
    return res.json(person)
  })

})

app.get('/info', (req, res, next) => {

  Person.find({}).then(person => {
    console.log('info.person', person)
    console.log('info.persons.lenght', person.length)
    const personsLenght = person.length
    const requestTime = new Date()
    const responseHtml = `<p>Phonebook has info for ${personsLenght} people</p><p>${requestTime}</p>`
    return res.send(responseHtml)
  }).catch(error => next(error))


})
app.get('/api/persons/:id', (req, res, next) => {
  //console.log("id", req.params.id)
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
  const reqId = req.params.id
  Person.findByIdAndRemove(reqId)
    .then(res.status(204).end())
    .catch(error => next(error))
})


app.post('/api/persons/', (req, res, next) => {
  const reqBody = req.body
  if (!reqBody.number) {
    return res.status(400).json({
      error: 'Number can not be empty.'
    })
  }
  const person = new Person({
    name: reqBody.name,
    number: reqBody.number
  })

  person.save()
    .then(savedPerson => { res.json(savedPerson) })
    .catch(error => {
      console.log('post.person.save.error', error)
      console.log('post.person.save.error.name', error.error)
      console.log('post.person.save.error.yay', error.errors.number.name)
      console.log('post.person.save.error.json', JSON.stringify(error))
      next(error)
    })

})

app.put('/api/persons/:id', (req, res, next) => {
  const reqBody = req.body
  const reqId = req.params.id
  if (!reqBody.name) {
    return res.status(400).json({
      error: 'Name can not be empty.'
    })
  }
  if (!reqBody.number) {
    return res.status(400).json({
      error: 'Number can not be empty.'
    })
  }
  Person.replaceOne({ _id: reqId }, reqBody).then(result => console.log('put.result', result)).catch(error => { next(error) })
  console.log('put.req', req.body)
  return res.status(204).end()
}
)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.errors.number.name === 'ValidatorError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
//always last
app.use(errorHandler)