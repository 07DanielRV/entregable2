import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [weatherApp, setWeatherApp] = useState({})

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=940b79fac28123b4ec7ced9a8871515a`)
    .then( res => res.json())
    .then(res => {
      setWeatherApp(res)

    })
    })
  },[])

  const [unit, setUnit] = useState('metric')
  const [degree, setDegree] = useState('°C')

  function Buttom() {

    if (unit == 'metric') {
      setUnit('imperial')
    }else{setUnit('metric')}

    if (degree == '°C') {
      setDegree('°F')
    }else{setDegree('°C')}

    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=${unit}&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=940b79fac28123b4ec7ced9a8871515a`)
    .then( res => res.json())
    .then(res => {
      setWeatherApp(res)

    })
    })
  }

  console.log(weatherApp)


  return (
    <div className="App">
      <div className="weathershow">
        <h1>Wheather App</h1>
        <h2>{weatherApp.name}, {weatherApp.sys?.country}</h2>
        <h3>{degree + ' ' + weatherApp.main?.temp}</h3>
        <div className='imagen'>
          <img src={`https://openweathermap.org/img/wn/${weatherApp.weather?.[0].icon}@2x.png`} alt="" />
        </div>
        <button onClick={Buttom}>°C/°F</button>
      </div>
    </div>
  )
}

export default App
