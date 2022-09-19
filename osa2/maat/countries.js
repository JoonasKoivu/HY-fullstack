import React from 'react'
import CountryName from './countryName'
import CountryInfo from './CountryInfo'

const Countries = ({countries, onCountrySelected}) => {
    const length = countries.length
    if(length === 1){
        return(<CountryInfo country={countries[0]} />)
    } 
    else if( countries.length > 10 ){
        return ( 
        <p>Too many matches, specify further</p> 
        )
    }
    else {
        return(
            <ul>
                {countries.map(country =>
                    <CountryName 
                        key={country.name.common}
                        country={country}
                        onCountrySelected={onCountrySelected}
                    />
                )}
            </ul>
        )
    }
}

export default Countries