import CountriesList from "./CountriesList"
import SelectedCountry from "./SelectedCountry"
import { useState, useEffect } from 'react'

const CountryResult = ({ countries }) => {
    //console.log("components.countryResult.countries", countries)


    const [selectedCountries, setSelectedCountries] = useState([])
    const [showResultSwitch, setResultSwitch] = useState([])

    useEffect(() => {
        setSelectedCountries(countries)
        showDeterminedAmountOfResults(countries)
    }, [countries])

    const handleSelectCountry = (country) => {
        setResultSwitch('selectedCountry')
        const selectedCountry = country
        console.log("components.countryResult.handleSelectCountry", selectedCountry)
        setSelectedCountries([selectedCountry])
    }

    const showDeterminedAmountOfResults = (countryFilter) => {
        //console.log("showDeterminedAmountOfResults.countries.length", countryFilter.length)
        if (countryFilter && countryFilter.length > 10) {
            //console.log("showDeterminedAmountOfResults.tenOrMore", countryFilter.length)
            setResultSwitch('tenOrMore')
            //console.log("showDeterminedAmountOfResults.tenOrMore.setShowResultsSwitch", showResultSwitch)
        }
        else if (countryFilter && (countryFilter.length <= 10 && countryFilter.length > 1)) {
            //console.log("app.tenormore3", countryFilter.length)
            setResultSwitch('lessThanTen')
            //console.log("showDeterminedAmountOfResults.lessThanTen.setShowResultsSwitch", showResultSwitch)
        }
        else if (countryFilter && countryFilter.length === 1) {
            setResultSwitch('selectedCountry')
            //console.log("showDeterminedAmountOfResults.lessThanTen.selectedCountry", showResultSwitch)
        }
        //console.log("components.countryResult.showResultsSwitch", showResultSwitch)
    }

    return (
        <>
            {(showResultSwitch === 'tenOrMore') &&
                <p>Too many matches, focus on the filterRRr matey!</p>
            }
            {(showResultSwitch === 'lessThanTen') && <CountriesList countries={selectedCountries} handleSelectedCountry={handleSelectCountry} />}
            {(selectedCountries && showResultSwitch === 'selectedCountry') &&
                <SelectedCountry country={selectedCountries} />}
        </>
    )
}
export default CountryResult