import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personsService from './services/persons'


const App = () => {
  //const [persons, setPersons] = useState([])

  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setnotificationStyle] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [useFilter, setUseFilter] = useState(false)

  //console.log("persons", persons)

  useEffect(() => {
    //console.log('effect')
    personsService
      .getAll()
      .then(response => {
        //console.log('promise fulfilled', response.data)
        setPersons(response)
      }).catch(error => {
        showNotification("general error", "red")
        console.log("error getall", error)
      })
  }, [])


  const resetForm = () => {
    setNewNumber('')
    setNewName('')
  }

  const showNotification = (message, style) => {
    setnotificationStyle(style)
    setNotificationMessage(
      message
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)
  }


  const addName = (event) => {
    //console.log("addName", event)
    const personsObj = persons
    event.preventDefault()

    const nameObj = {
      name: newName,
      number: newNumber,
    }
    const checkForDuplicate = personsObj.find(lookForObj => lookForObj.name === newName)
    console.log("checkforDup", checkForDuplicate)

    if (checkForDuplicate) {
      if (window.confirm(`Found matey ${checkForDuplicate.name} want to replace numbeRRr ${checkForDuplicate.number} with ${newNumber} instead, yarr 🦜 ?`)) {
        checkForDuplicate.number = newNumber
        personsService
          .update(checkForDuplicate.id, nameObj)
          .then(response => {
            console.log("put response", response)
            resetForm()
            if ('error' in response) {
              showNotification(`Error: server and client missmatch: ${checkForDuplicate.name} has been deleted`, "red")
              setPersons(personsObj.filter(item => item !== checkForDuplicate))
            } else {
              showNotification(`The numberrRR of ${checkForDuplicate.name} was changed to ${newNumber}`, "green")
            }
          })
        return
      }
      else { return }
    }

    personsService
      .create(nameObj)
      .then(response => {
        //console.log("post resp", response)
        resetForm()
        setPersons(personsObj.concat(response))
        showNotification(`${response.name} was added`, "green")
      }).catch(error => {
        console.log("app.error", error)
        console.log("app.error.response", error.response)
        showNotification(error.response.data.error, "red")
      })
  }

  const handleNameChange = (event) => {
    //console.log("handleNameChange", event)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log("handleNameChange", event)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    //console.log("handleNameChange", event)
    setNewFilter(event.target.value)
    if (event.target.value) {
      setUseFilter(true)
    } else {
      setUseFilter(false)
    }
  }
  const personDelete = (person) => {
    //console.log("handleDelete", person.id)
    //console.log("handleDelete person", person)
    const allPersons = persons

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      //console.log("person index", allPersons.findIndex(n => n.id === person.id))
      personsService
        .remove(person.id)
        .then(response => {
          console.log("weird error", response)
          if ('error' in response) {
            showNotification(`${person.name} has already been deleted`, "red")
          } else { showNotification(`${person.name} deleted`, "green") }
          //console.log("delete resp", response)
        })
      setPersons(allPersons.filter(item => item !== person))
    }
  }


  const filteredPersons = !useFilter ? persons : persons.filter(person => person.name.includes(newFilter))
  //console.log("filteredPersons", filteredPersons)


  return (
    <>
      {/* <div>debug: {newFilter}</div> */}
      <div>
        <h2>Phonebook</h2>
        <Notification message={notificationMessage} style={notificationStyle} />
        <Filter header="Filter"
          newFilter={newFilter} handleFilterChange={handleFilterChange} />
        <AddNewPerson
          header="Add new person"
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />
        <Numbers
          filteredPersons={filteredPersons}
          personDelete={personDelete} />
      </div>
    </>
  )

}

export default App