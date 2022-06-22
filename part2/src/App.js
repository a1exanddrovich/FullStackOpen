import {useState, useEffect} from "react";
import axios from "axios";

const App = () => {
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState(countries)
    const apiKey = process.env.REACT_APP_MY_KEY

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                const data = response.data
                setCountries(data)
                setCountriesToShow(data)
            })
    }, [])

    const handleChangeInput = event => {
        if (event.target.value !== "") {
            setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
        } else {
            setCountriesToShow(countries)
        }
    }

    const handleSingleCountry = country => {
        return <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages: </h3>
            <ul>
                {Object.keys(country.languages).map(key => <li key={key}>{key}</li>)}
            </ul>
            <img src={country.flags.png} alt="Flag"/>
            <h2>Weather in {country.capital}</h2>

        </div>
    }

    return (
        <div>
            find countries <input type="text" onChange={handleChangeInput}/>
            {
                countriesToShow.length === 1 ? handleSingleCountry(countriesToShow[0])
                    : countriesToShow.length > 10 ? <div>Too many matches, specify another filter</div>
                    : <ul>
                        {countriesToShow.map(country => <li key={country.name.common}>{country.name.common}</li>)}
                    </ul>

            }
        </div>
    )

}

export default App