import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function weatherSearch(event) {
    event.preventDefault();
    let apiKey = "cc999affbe9b79dd154b4475b816b4e5";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="weather-app">
      <form onSubmit={weatherSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter a city.."
          className="search-input"
          required
          onChange={updateCity}
        />
        <input type="submit" value="Search" className="search-button" />
      </form>
      <div className="row">
        <div className="col weather-desc">
          <p>
            Wednesday 11:55, {weather.description}
            <br />
            Humidity: <span>{weather.humidity}%</span>, Wind:{" "}
            <span>
              {weather.wind}
              km/h
            </span>
          </p>
        </div>
        <div className="col temp-section">
          <img src={weather.icon} alt={weather.description} />{" "}
          <span className="temp">{Math.round(weather.temperature)}</span>{" "}
          <span className="symbol">°C</span>
        </div>
        <footer>
          Coded by Kalen and is
          <a href="https://www.github.com"> open-sourced</a>
        </footer>
      </div>
    </div>
  );
}
