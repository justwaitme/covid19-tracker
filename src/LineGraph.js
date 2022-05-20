import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';


function LineGraph() {
  const [data, setData] = useState({});
  //https://disease.sh/v3/covid-19/historical/all?lastdays=120
  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
    .then(response => response.json())
    .then(data =>{
      //console.log(data);
      const chartData = buildCharData(data, 'cases');
      setData(chartData);
    })
  },[])

  const buildCharData = (data, casesType='cases') => {
    const charData = [];
    let lastDataPoint;

    for(let date in data.cases) {
      if(lastDataPoint){
        const newDataPoint = {
          x:date,
          y:data['cases'][date] - lastDataPoint
        }
        charData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date]; 
    }
    return charData;
  }

  return (
    <div>
      <h1>I'm a Chart</h1>
      <Line 
        data={{
          datasets:[{
            data: data,
            borderColor:"#CC1034",
            backgroundColor: "rgba(204,16,52,0.5)"
          }]
            
        }}
      />
      
    </div>
  )
}

export default LineGraph