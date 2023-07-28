const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI
//console.log("models.person.url", url)


console.log('connecting to', url)
mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: newNumber => {
        const number = newNumber.split('-')
        console.log('person.number.validator.split', number)
        if (
          number.length === 2
                    && number[0]
                    && !isNaN(number[0])
                    && number[1]
                    && !isNaN(number[1])
                    && newNumber.length >= 8
                    && (number[0].length === 2 || number[0].length === 3)) {
          // console.log("person.number.validator.split.number0", number[0])
          // console.log("person.number.validator.split.number0", number[1])
          // console.log("person.number.validator.split.length", newNumber.length)
          console.log('person.number.validator', 'true')
          return true
        } else {
          console.log('person.number.validator', 'false')
          return false
        }
      },
      message: 'YarrR length not be rrRRight.'
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)