import {useState, useEffect} from "react"
import phonebookService from "./service/phonebook"

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

const Persons = ({personList}) => {
    return (
        <div>
            {
                personList.map(person => <PersonDetail key={person.name} singlePerson={person}/>)
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
                    setNewName("")
                    setNewNumber("")
                    setPersonsToShow(actualPersons)
                })
        } else {
            alert(`${newName} already exists in the list`)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterValueHandler={handleFilterValue}/>
            <PersonForm newPersonHandler={addNewPerson}
                        changePersonNameHandler={handleChangePersonName}
                        changePersonNumberHandler={handleChangePersonNumber}/>
            <h2>Numbers</h2>
            <Persons personList={personsToShow}/>
        </div>
    )
}

export default App