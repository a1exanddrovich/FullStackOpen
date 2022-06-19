import {useState} from "react"

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
                Phone: <input onChange={props.changePersonPhoneHandler}/>
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
        <div>{singlePerson.name} - {singlePerson.phone}</div>
    )
}

const App = () => {

    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', phone: '040-123456', id: 1},
        {name: 'Ada Lovelace', phone: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', phone: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4}
    ])

    const [newName, setNewName] = useState("")

    const [newPhone, setNewPhone] = useState("")

    const [personsToShow, setPersonsToShow] = useState(persons)

    const isAbsent = () => persons.filter(person => person.name === newName).length === 0

    const handleFilterValue = event => {
        if (event.target.value !== "") {
            setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
        } else {
            setPersonsToShow(persons)
        }
    }

    const handleChangePersonName = event => setNewName(event.target.value)

    const handleChangePersonPhone = event => setNewPhone(event.target.value)

    const addNewPerson = event => {
        event.preventDefault()
        if (isAbsent()) {
            const newPersonObject = {
                id: persons.length + 1,
                name: newName,
                phone: newPhone
            }
            const actualPersons = persons.concat(newPersonObject)
            setPersons(actualPersons)
            setNewName("")
            setNewPhone("")
            setPersonsToShow(actualPersons)
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
                        changePersonPhoneHandler={handleChangePersonPhone}/>
            <h2>Numbers</h2>
            <Persons personList={personsToShow}/>
        </div>
    )
}

export default App