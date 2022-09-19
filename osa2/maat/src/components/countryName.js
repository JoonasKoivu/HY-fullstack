const CountryName = ({country, onCountrySelected}) => {
    const showCountry = (country) => {
        onCountrySelected(country.name.common)
    }
    return(
        <li>
            {country.name.common}<br></br>   
            <button onClick={() => showCountry(country)}> show </button>
        </li>
    )
}

export default CountryName