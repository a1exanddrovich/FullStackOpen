import {useState, useEffect} from "react"
import phonebookService from "./service/phonebook"

const Notification = ({message, error}) => {
    if (message == null) {
        return null
    }
    if (error) {
        return (
            <div className="messageStyleError">
                {message}
            </div>
        )
    }
    return (
        <div className="messageStyle">
            {message}
        </div>
    )
}

const Filter = (props) => {
    return (
        <div>
        Filter with the word: <input type="text" onChange={props.filterValueHandler}/>
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.newPersonHandler}>
            <div>
                Name: <input onChange={props.changePersonNameHandler}/>
                <br/>
                Number: <input onChange={props.changePersonNumberHandler}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

const Persons = ({personList, deleteMethod}) => {
    return (
        <div>
            {
                personList.map(person => <div key={person.name}><PersonDetail singlePerson={person}/><button onClick={() => deleteMethod(person.id, person.name)}>Delete</button></div>)
            }
        </div>
    )
}

const PersonDetail = ({singlePerson}) => {
    return (
        <div>{singlePerson.name} - {singlePerson.number}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [personsToShow, setPersonsToShow] = useState(persons)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setPersonsToShow(initialPersons)
            })
    }, [])

    const isAbsent = () => persons.filter(person => person.name === newName).length === 0

    const handleFilterValue = event => {
        if (event.target.value !== "") {
            setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
        } else {
            setPersonsToShow(persons)
        }
    }

    const handleChangePersonName = event => setNewName(event.target.value)

    const handleChangePersonNumber = event => setNewNumber(event.target.value)

    const deleteById = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            const personsToSet = persons.filter(person => person.id !== id)
            setPersons(personsToSet)
            setPersonsToShow(personsToSet)
            phonebookService.deleteById(id)
        }
    }

    const addNewPerson = event => {
        event.preventDefault()
        if (isAbsent()) {
            const newPersonObject = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            phonebookService
                .create(newPersonObject)
                .then(createdPerson => {
                    const actualPersons = persons.concat(createdPerson)
                    setPersons(actualPersons)
                    setPersonsToShow(actualPersons)
                })
            setTimeout(() => {
                setMessage(`Added ${newName}`)
            }, 3000)
        } else if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
            const newPersonObject = {
                id: persons.find(person => newName === person.name).id,
                name: newName,
                number: newNumber
            }
            phonebookService
                .updateById(newPersonObject)
                .then(updatedPerson => {
                    const actualPersons = persons.filter(person => person.id !== newPersonObject.id).concat(updatedPerson)
                    setPersons(actualPersons)
                    setPersonsToShow(actualPersons)
                }, () => setTimeout(() => {
                    setMessage(`Information of ${newName} has already been removed from server`)
                }, 3000))
        }
        setNewName("")
        setNewNumber("")
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} error={false}/>
            <Filter filterValueHandler={handleFilterValue}/>
            <PersonForm newPersonHandler={addNewPerson}
                        changePersonNameHandler={handleChangePersonName}
                        changePersonNumberHandler={handleChangePersonNumber}/>
            <h2>Numbers</h2>
            <Persons personList={personsToShow} deleteMethod={deleteById}/>
        </div>
    )
}

export default App