import React, { Component, useState, useEffect } from "react";

import "../styles/App.css";
import { Header } from "./Header";
import { InputField } from "./InputField";
import { Route, Switch } from "react-router-dom";
import WeatherDetails from "./WeatherDetails";
import axios from "axios";
import WeatherData from "./WeatherData";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [listPlaces, setListPlaces] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [currentCoord, setCurrentCoord] = useState([]);

  if (listPlaces.length > 5) {
    setListPlaces([]);
    setWeatherData([]);
    setCurrentData([]);
    setValue("");
    setIsLoaded(true);
    setCurrentCoord([]);
  }

  function getWeatherData(event) {
    event.preventDefault();
    if (!listPlaces.includes(value)) {
      axios
        .post(
          `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=6627805f240aca84b4a726d2429a3208`
        )
        .then((res) => {
          setWeatherData((weatherData) => [...weatherData, res.data]);
          setListPlaces((listPlaces) => [...listPlaces, res.data.name]);
          setCurrentData(res.data);
          setValue("");
          setIsLoaded(false);
          setCurrentCoord(res.data.coord);
        })
        .catch((error) => console.log(error));
    } else {
      setValue("");
      setIsLoaded(false);
    }
  }
  function onChangeValue(e) {
    setValue(e.target.value);
  }

  return (
    <div>
      <Header isLoaded={isLoaded} />
      <InputField
        setWeatherData={setWeatherData}
        setListPlaces={setListPlaces}
        setCurrentData={setCurrentData}
        getWeatherData={getWeatherData}
        value={value}
        weatherData={weatherData}
        isLoaded={isLoaded}
        onChangeValue={onChangeValue}
        setValue={setValue}
        weatherData={weatherData}
      />
      {!isLoaded && <WeatherData weatherData={weatherData} />}
      <Route path="/weather-details">
        {!isLoaded && <WeatherDetails currentCoord={currentCoord} />}
      </Route>
    </div>
  );
}

export default App;
