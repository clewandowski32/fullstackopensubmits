import {useState, useEffect} from 'react'
import countriesService from './services/countries'

const ShowCountry = ({visible}) => {

  
  return(
    <div>
      <h1>{visible.name.common}</h1>
      <div>
        capital: {visible.capital}
      </div>
      <div>
        area: {visible.area}
      </div>
      <h3>languages:</h3>
        <ul>
          {Object.values(visible.languages).map(language =>(
            <li key={language}>
              {language}
            </li>
          ))}
        </ul>
        
        <img src={visible.flags.png}/>
    </div>
  )
}

const Display = ({countries}) => {
  const [displayedCountries, setDisplayedCountries] = useState([])

  const [weather, setWeather] = useState([])

  
  //useEffect hook has [countries] dependency which means
  //it will only be triggered when 'countries' array changes
  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0];
      countriesService.getWeather(country).then((newWeather) => {
        setWeather(newWeather);
      });
    }
  }, [countries]);
  
  const toggleShow = (country) => {
    if(displayedCountries.includes(country)){
      setDisplayedCountries(displayedCountries.filter(c => c !== country))
    }
    else{
      setDisplayedCountries(displayedCountries.concat(country))
    }
  }

  
  
  console.log(countries)

  if(countries === []){
    return null
  }
  else if(countries.length > 10){
    return(
      <div>
        too many matches
      </div>
    )
  }
  else if(countries.length < 10 && countries.length > 1){
    return(countries.map(country => {
      return(
      <div key={country.cca3}>
        {country.name.common}
        <button onClick ={() => toggleShow(country)}>
          {displayedCountries.includes(country) ? 'hide' : 'show'}
        </button>
        {displayedCountries.includes(country) ? 
        <ShowCountry visible={country} /> :
        null}
      </div>
      )
    }))
  }
  else{
    console.log(weather)
    const temp = weather.list[0].main.temp - 273.15
    const tempRounded = temp.toFixed(2)
    const icon = weather.list[0].weather[0].icon
    return(
      countries.map(country => {
        return(
          <div key={country.cca3}>
            <ShowCountry visible={country} />
            <h2>Weather in {country.capital}</h2>
            temperature {tempRounded} Celsius
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
          </div>
      )}
    ))
  }
}

const App = () => {
  const [countrySearch, setCountrySearch] = useState('')

  const [countries, setCountries] = useState([])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    if(event.target.value === ''){
      setCountrySearch('')
    }
    else{
      setCountrySearch(event.target.value)
    }
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(countryList =>{
        setCountries(countryList)
      })
    console.log(countries)
  }, [])

  const searchInput = () => {
    if (countrySearch === ''){
      return []
    }
    const filteredCountries = countries.filter(country => 
                              country.name.common.toLowerCase()
                              .includes(countrySearch.toLowerCase()))
    return filteredCountries
  }
  
  return (
    <div>
      find countries
      <input 
        value={countrySearch}
        onChange={handleSearchChange}
      >
      </input>
      <Display key={1} countries={searchInput()}/>
    </div>
  );
}

export default App;
