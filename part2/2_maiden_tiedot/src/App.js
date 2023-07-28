import React, { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountrySearch from './components/CountrySearch'
import CountryResult from './components/CountryResult'


const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showResultsSwitch, setShowResultsSwitch] = useState('tenOrMore');


  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response)
        setFilteredCountries(response)
        //console.log("app.useEffect.countries.length", countries.length)
        //console.log('app.useEffect.axiosresponse', response)
      }).catch(error => console.log("error getall", error))
  }, [])


  const handleCountryChange = (event) => {
    //console.log("app.handleCountryChange", event)
    //console.log("app.handleCountryChange.countries", countries)
    let countryFilter = countries.filter(countries => {
      //console.log("app.handleCountryChange.countryFilter", countries)
      return countries.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    })
    //console.log("handleCountryChange.countryFilter", countryFilter)
    setFilteredCountries(countryFilter)
  }



  return (
    <>
      <div>
        <CountrySearch header="Find countries"
          countryFilter={filteredCountries}
          handleCountryChange={handleCountryChange}
        />
        <CountryResult
          countries={filteredCountries}
        />
      </div>
    </>
  )

}

export default App