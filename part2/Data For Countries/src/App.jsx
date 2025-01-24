import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterCountries = ({countries, filter}) => {
  const filteredCountries = countries.filter(country => (country.name.common).toLowerCase().includes(filter))
  const filteredCountriesLength = filteredCountries.length;

  if (filteredCountriesLength > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  } else if (filteredCountriesLength === 1) {
    const country = filteredCountries[0]

    const name = country.name.common
    const area = country.area
    const capital = country.capital['0']

    const langKey = []
    for (let key in country.languages) {
      langKey.push(key)
    }

    const flag = country.flag

    const style = {fontSize: "10rem"}

    return (
      <>
        <h1>{name}</h1>
        <div>capital: {capital}</div>
        <div>area: {area}</div>
        <br />

        <b>languages:</b>
        <ul>
          {langKey.map(lang => {
            return (
              <li key={lang}>
              {country.languages[lang]}
              </li>
            )
          })}
        </ul>

        <div style={style}>
          {flag}
        </div>
      </>
    )
  } else if (filteredCountriesLength === 0) {
    return (
      <div>
        Couldn't find anything. Try different filter
      </div>
    )
  } else {
    return (
      <>
        {filteredCountries.map(country => {
          return(
            <div key={country.name.common}>{country.name.common}</div>
          )
        })}
      </>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
      .catch(() => console.log("Error Getting Data From Server"))
  }, [])

  return (
    <> 
      find countries <input onChange={e => setUserInput(e.target.value)}/>
      <FilterCountries countries={countries} filter={userInput.toLowerCase()}/>
    </>
  )
}

export default App
