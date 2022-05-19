import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
 const [countries, setCountries] = useState([]); 
 const [country, setCountry] = useState("worldwide");
 const [countryInfo, setCountryInfo] = useState({});

 


  useEffect(()=>{
    //https://disease.sh/v3/covid-19/countries
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

  //https://disease.sh/v3/covid-19/countries/{country}
  useEffect(()=>{
    const getCountryInfo = async () => {
      const url = country === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${country}`
        await fetch(url)
        .then(response => response.json())
        .then((data) => {
          setCountryInfo(data)
        })
    }
    getCountryInfo();
  },[country])

  const onCountryChange = async (event) => {
    setCountry(event.target.value);
  }
  return (
    <div className="app">
      <div className='app__left'>
      <div className='app__header'>
        {/* Header */}
        {/* Title + input dropdown field*/}
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
      
      <div className='app__stats'>
          {/* InfoBox title=coronaviruscases       */}
          <InfoBox title="corona-virus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          {/* InfoBox title=coronavirusrecoveries  */}
          <InfoBox title="corona-virus Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* InfoBox title=coronavirusdeaths     */}
          <InfoBox title="corona-virus Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>

        {/* Map */}
         <Map />   
      </div>


      <div className='app__right'>
                <Card>
                  <CardContent>
                  <h3>Live Cases By Country</h3>
                  {/* Table */}
                  <h3>Worldwide new cases</h3>
                  {/* Graph*/}
                  </CardContent>
                </Card>    
      </div>
      

      
    </div>
  );
}

export default App;
