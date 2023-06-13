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
            <li>
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
  
  const toggleShow = (country) => {
    if(displayedCountries.includes(country)){
      setDisplayedCountries(displayedCountries.filter(c => c !== country))
    }
    else{
      setDisplayedCountries(displayedCountries.concat(country))
    }
  }
  
  if(countries === null){
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
      <div>
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
    return(
      countries.map(country => {
        console.log(country.languages)
        countriesService
          .getWeather(country)
          //.then(weather =>
          //     console.log(weather))
        return(
          <div>
            <ShowCountry visible={country} />
            <h2>
              Weather in {country.capital}
            </h2>
          </div>
        )
      }
      )
    )
  }
}

const App = () => {
  const [countrySearch, setCountrySearch] = useState(null)

  const [countries, setCountries] = useState([])

  const [weather, setWeather] = useState([])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    if(event.target.value === ''){
      setCountrySearch(null)
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
    if (countrySearch === null){
      return null
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
      <Display countries={searchInput()}/>
    </div>
  );
}

export default App;
