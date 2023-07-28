const CountrySearch = ({ header, country, handleCountryChange }) => {
    return (
        <>
            <h3>{header}</h3>
            <div><span role="img" aria-label='enter filter'>🔍</span><input value={country} onChange={handleCountryChange} /></div>
        </>
    )
}
export default CountrySearch