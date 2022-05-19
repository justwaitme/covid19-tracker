import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
 const [countries, setCountries] = useState([]); 
 const [country, setCountry] = useState("worldwide");
  //https://disease.sh/v3/covid-19/countries

  useEffect(()=>{
    const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then((data) => {
        const countries = data.map(country =>({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          setCountries(countries);
      })
    }
  
    getCountriesData();

  },[])

  const onCountryChange = async (event) => {
    setCountry(event.target.value);
  }
  return (
    <div className="app">
      {/* Header */}
      {/* Title + input dropdown field*/}
      <div className='app__header'>
          <h1>React Covid-19 Tracker V1 </h1>
          <FormControl className="app__dropdown">
            <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map(country=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              
            </Select>
          </FormControl>
      </div>
      
      

      {/* InfoBox*/}
      {/* InfoBox*/}
      {/* InfoBox*/}

      {/* Map */}

      {/* Table */}
      {/* Graph*/}
    </div>
  );
}

export default App;
