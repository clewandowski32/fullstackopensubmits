import { useState, useEffect } from 'react'
import axios from 'axios'

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
  return(
    <div>
      {personsToShow.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
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

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
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
    const personObject = { name: newName, number: newNumber, id: persons.length + 1}

    const existingIndex = persons.findIndex(person => person.name === personObject.name);

    if(existingIndex !== -1){
      console.log(persons[personObject.name])
      console.log(persons)
      console.log(persons.indexOf(personObject))
      alert(`${personObject.name} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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