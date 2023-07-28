const CountriesList = ({ countries, handleSelectedCountry }) => {

    //console.log("components.CountriesList", countries)

    const ulStyle = {
        listStyleType: "none",
        padding: 0,
        margin: 0
    }

    const onSelectedCountry = (selectedCountry) => {
        //console.log("components.CountriesList.handleSelectedCountry", selectedCountry)
        handleSelectedCountry(selectedCountry)
    }
    return (
        <ul style={ulStyle}>
            {countries.map(country =>
                <li key={country.name.common}>{country.name.common} <button onClick={() => onSelectedCountry(country)}><span role="img" aria-label='select this country'>📂</span></button></li>)}
        </ul>
    )
}
export default CountriesList