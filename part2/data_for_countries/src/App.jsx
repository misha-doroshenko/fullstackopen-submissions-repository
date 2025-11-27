import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [shownCountries, setShownCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      const receivedCountries = response.data.map(country => {
        return ({
          id: country.cca3,
          countryName: country.name.common,
          area: country.area,
          capital: country.capital ? country.capital : [],
          capitalInfo: country.capitalInfo,
          languages: country.languages ? Object.values(country.languages) : [],
          flag: country.flags.svg
        })
      })
      setCountries(receivedCountries)
  })
  }, [])

  const handleChangeFilter = event => {
    setFilter(event.target.value)
    setShownCountries([])
  }

  const handleClickShow = id => {
    if (shownCountries.includes(id)) {
      setShownCountries(shownCountries.filter(countryId => countryId !== id))
    } else {
      setShownCountries(shownCountries.concat(id))
    }
  }

  return (
    <>
    <input value={filter} onChange={handleChangeFilter}></input>

    <Countries 
      countries={countries}
      filter={filter}
      onClick={handleClickShow}
      shownCountries={shownCountries}
    />
    </>
  )
}

export default App
