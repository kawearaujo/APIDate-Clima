import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather= async(lat,long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  },[])
  
  if (!location) {
    return(
      <Fragment>
        <h3>Clima nas suas Coordenadas (N/A)</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: N/A</li>
          <li>Temperatura máxima: N/A</li>
          <li>Temperatura minima: N/A</li>
          <li>Pressão: N/A</li>
          <li>Umidade: N/A</li>
        </ul>
      </Fragment>
    );
    }else if (!weather){
      return(
        <Fragment>
          Carregando o Clima...
        </Fragment>
  
      )
  
  }else{
    return (
      <Fragment>
        <h3>Resumo atual do clima em {weather['name']}[{weather['sys']['country']}] :</h3>
        <hr />
        <ul>
          <li>O céu está com: {weather['weather'][0]['description']}</li>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Velocidade do Vento: {weather['wind']['speed']}km/h</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }

  
}

export default App;