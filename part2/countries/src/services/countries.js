import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(countriesUrl)
    return request.then(response => response.data)
}

const getWeather = (country) => {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const request = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    getWeather
}
