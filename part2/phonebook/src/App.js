import { useState, useEffect } from 'react'

import personsService from './services/persons'

const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
    filter shown with <input 
                        value={filter}
                        onChange={handleFilterChange}
                      />
  </div>
  )
}

const Notification = ({message}) => {
  if (message === null){
    return null
  }
  return(
    <div className='added'>
      {message}
    </div>
  )
}

const ErrorMessage = ({message}) => {
  if(message === null){
    return null
  }
  return(
    <div className='deleted'>
      {message}
    </div>
  )
}

const PersonForm = ({addPerson, newName, 
                     handleNameChange, newNumber, 
                     handleNumberChange}) => {
  return (<form onSubmit={addPerson}>
    <div>
      name: <input 
              value={newName} 
              onChange={handleNameChange}
            />
    </div>
    <div>
      number: <input 
                value={newNumber}
                onChange={handleNumberChange}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
  
}

const Persons = ({personsToShow}) => {

  const handleDelete = (person) => {
    const confirmed = window.confirm(`Delete ${person.name} ?`)
    
    if(confirmed){
      personsService.deleteElem(person.id)
    }
  }


  return(
    <div>
      {personsToShow.map(person => 
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => handleDelete(person)}>
            delete</button>
        </div>
      )}
    </div>
    
  ) 
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => 
      setPersons(initialPersons))
  }

  console.log('render', persons.length, 'notes')

  useEffect(hook, [])



  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow =
  filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) === true)
  : persons
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber}

    const existingIndex = persons.findIndex(person => person.name === personObject.name);

    if(existingIndex !== -1){
      const confirmed = window.confirm(`${personObject.name} is already in the phonebook, replace the old number with a new one?`)
      if(confirmed){
        const currPerson = persons.find(p => p.name === personObject.name)
        const updatedPerson = {...currPerson, number: newNumber}

        personsService
          .update(updatedPerson.id, personObject)
          .then(returnedPerson =>{
            setPersons(persons.map(person => 
                       person.id !== updatedPerson.id ? 
                       person :
                       returnedPerson
                       ))
            setMessage(`Updated ${updatedPerson.name}'s number`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Person ${updatedPerson.name} was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
          })
      }
    }
    else{
      personsService
        .create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added new person ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <ErrorMessage message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
                  handleNameChange={handleNameChange} newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App