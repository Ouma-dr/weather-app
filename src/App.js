
import { useState } from 'react';
import './App.css';
import { WiHumidity }from 'react-icons/wi';
import { MdSpeed }from 'react-icons/md';
import { BsFillCloudsFill }from 'react-icons/bs';

import './App.css';




function App() {
  const key = "4909592ecd5ca82b99e6ad74fd3c3d9d";
  const  base = "https://api.openweathermap.org/data/2.5/";
  const dateBuilder = (d) =>{
    let months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDay();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    

    return `${day} ${date} ${month}  ${year} `
  }

  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState();
  
  const search = e =>{
    if(e.key === 'Enter'){
      fetch(`${base}weather?q=${input}&units=Metric&APPID=${key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        //console.log(weather);
        
      }
        
        )
      
    }
    
  }
  


  return (
    <div className="App">
      <div className="main" >
         <h1> Weather App </h1>
         <div className='flex'>
         <div className="search">
           <input
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyPress={search}
            type="text" 
            className='input'
            placeholder='Search...'/>
         </div>

         {weather && (
          <div className='container'>
          
          <div className='location-box'>
              <div className='location'>
                   <h3>{weather.name}, {weather.sys.country}</h3>
              </div>
              <div className='date'>
                 {dateBuilder(new Date())}
              </div> 
              <p>{getTime(weather.sys.sunset)}</p>
           </div>
          <div className='temp'>
          <img
               src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
               alt=''
             />
             <span>{Math.round(weather.main.temp)}°c ({weather.weather[0].main})</span>
          </div> 
           
        <div className='weather-box'>
             <div className='box'>
                <WiHumidity className='icon'/>
                <h3>Humidity: <span>{`${Math.round(weather.main.humidity)} %`}</span></h3>
              </div>
             <div className='box'>
               <MdSpeed className='icon'/>
               <h3>Wind: <span>{`${weather.wind.speed} m/s`}</span></h3>
             </div>
             <div className='box'>
               <BsFillCloudsFill className='icon'/>
               <h3>Clouds: <span>{`${Math.round(weather.clouds.all)} %`}</span></h3>
               
             </div>
     
         </div> 

               
          </div>

       )}
         </div>
       
        

      </div>
    </div>
    
  )
}

export default App;
