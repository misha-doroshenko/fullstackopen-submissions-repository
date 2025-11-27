import Weather from "./Weather"

const CountryFull = ({ country, getWeather, capitalsWeather }) => {
  const capitalExists = country.capital.length > 0
  return (
    <div>
      <h1>{country.countryName}</h1>
      <div>Capital {capitalExists ? country.capital.join(', ') : '-'}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => {
          return <li key={`${country.countryName}-${language}`}>{language}</li>
        })}
      </ul>
      <img src={country.flag} height={180} width={300}/>
      {capitalExists ? <Weather country={country} /> : null}
    </div>
  )
}

const CountryPreview = ({ country, onClick, shownCountries }) => {
  const shownState = shownCountries.includes(country.id)
  const buttonText = shownState ? 'Hide' : 'Show'
  return (
    <div>
      <div>{country.countryName} <button onClick={onClick}>{buttonText}</button></div>
      {shownState ? <CountryFull country={country} /> : null}
    </div>
  )
}

const Countries = ({ countries, filter , onClick, shownCountries }) => {
  const filteredCountries = countries.filter(country => {
    return country.countryName.toLowerCase().includes(filter.toLowerCase())
  })

  if (!filter) {
    return <div>Start entering the name of the country</div>
  }
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return <CountryFull country={country} />
  }
  if (filteredCountries.length === 0) {
    return <div>No countries found</div>
  }
  return <>
    {filteredCountries.map(country => {
       return <CountryPreview 
        key={country.id} 
        country={country} 
        onClick={() => onClick(country.id)} 
        shownCountries={shownCountries}
      />
    })}
  </>
}

export default Countries