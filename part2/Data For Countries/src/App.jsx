import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY

const ShowCountryDetails = ({ country }) => {
    const name = country.name.common;
    const area = country.area;
    const capital = country.capital[0];

    const langKey = [];
    for (let key in country.languages) {
        langKey.push(key);
    }
    const flag = country.flag;
    const style = { fontSize: "10rem" };

    return (
        <div>
            <h1>{name}</h1>
            <div>Capital: {capital}</div>
            <div>Area: {area}</div>
            <br />

            <b>Languages:</b>
            <ul>
                {langKey.map((lang) => {
                    return <li key={lang}>{country.languages[lang]}</li>;
                })}
            </ul>

            <div style={style}>{flag}</div>
            <ShowWeatherDetails capital={capital} />
        </div>
    );
};


const ShowWeatherDetails = ({ capital }) => {
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [weatherIconId, setWeatherIconId] = useState(null)
    const api_request = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
    const weatherIcon = weatherIconId ? `https://openweathermap.org/img/wn/${weatherIconId}@2x.png` : '';

    useEffect(() => {
        axios
            .get(api_request)
            .then((response) => {
                console.log(response)
                setWeatherData(response.data)
                setWeatherIconId(response.data.weather[0].icon)
                setLoading(false)
            })
            .catch(() => console.log("Error Getting Data From Server"));
    }, [capital]);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (<>
        <h2>Weather in {capital}</h2>
        <div>temperature {(weatherData.main.temp - 273.15).toFixed(2)}°C</div>
        <img src={weatherIcon} />
        <div>wind {weatherData.wind.speed} m/s</div>
    </>)
}

const FilterCountries = ({ countries, filter }) => {
    const [countryToShow, setCountryToShow] = useState(null);

    if (!filter) return null;

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter),
    );
    const filteredCountriesLength = filteredCountries.length;

    if (filteredCountriesLength > 10) {
        return <div>Too many matches, specify another filter</div>;
    } else if (filteredCountriesLength === 0) {
        return <div>Couldn't find anything. Try different filter</div>;
    } else {
        if (filteredCountriesLength === 1) {
            return <ShowCountryDetails country={filteredCountries[0]} />;
        } else {
            return (
                <div>
                    {filteredCountries.map((country) => {
                        return (
                            <div key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => setCountryToShow(country)}>Show</button>
                            </div>
                        );
                    })}

                    {countryToShow && <ShowCountryDetails country={countryToShow} />}
                </div>
            );
        }
    }
};

const App = () => {
    const [countries, setCountries] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        axios
            .get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then((response) => setCountries(response.data))
            .catch(() => console.log("Error Getting Data From Server"));
    }, []);
    return (
        <>
            <div>
                find countries: <input onChange={(e) => setUserInput(e.target.value)} />
            </div>
            <FilterCountries countries={countries} filter={userInput.toLowerCase()} />
        </>
    );
};

export default App;
