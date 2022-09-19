import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Countries from './components/countries'

/*
REACT_APP_API_KEY=2e98c088bdb11a0c884df338396ca5bd npm start
*/

function App() {

const [countries, setCountries] = useState([])
const [filter, setFilter] = useState('')

useEffect(() => {
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response => {
    setCountries(response.data)
  })
},[]
)

const handleFilterChange = (event) => {
  event.preventDefault()
  setFilter(event.target.value)
}

const handleCountrySelected = (country) => {
  setFilter(country)
}

const countryNamesFiltered = countries
  .filter((country)=> 
    country.name.common.toLocaleLowerCase()
    .includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <Countries countries={countryNamesFiltered} onCountrySelected={handleCountrySelected}/>
    </div>
  );
}

export default App;
