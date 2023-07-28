import Weather from "./Weather"

const SelectedCountry = ({ country }) => {
    console.log("components.SelectedCountry", country)
    country = country[0]

    //console.log("components.SelectedCountry.country.name.common", country.name.common)
    //console.log("components.SelectedCountry.country.languages", country.languages)

    const imgStyle = {
        border: '3px groove black',

    }


    return (

        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h4>languages:</h4>
            <ul>
                {Object.entries(country.languages).map(country => {
                    //console.log("components.SelectedCountry.languages",country)
                    return <li key={country[0]}>{country[1]}</li>
                }
                )}
            </ul>
            <img style={imgStyle} src={country.flags.png} alt={country.flags.alt} />
            <Weather country={country} />
        </div>
    )
}
export default SelectedCountry