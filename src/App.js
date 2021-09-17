import React, { useEffect, useState } from "react";

// Obtain API Key from OpenWeatherMap.org
// Use https://home.openweathermap.org/users/sign_up to create an account

const api = {
  key: "************",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [theme, setTheme] = useState("app init");
  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod == "404") {
            setTheme("app init");
            setWeather(result);
            setQuery("");
            console.log(result);
          } else {
            console.log(result);
            setWeather(result);
            setQuery("");
            console.log(result);
            setTheme("");
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday,",
      "Monday,",
      "Tuesday,",
      "Wednesday,",
      "Thursday,",
      "Friday,",
      "Saturday,",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
  };
  useEffect(() => {
    if (theme != "app init") {
      if (weather.main) {
        if (weather.main.temp > 16) {
          setTheme("app hot");
        }
        if (weather.main.temp > 0 && weather.main.temp <= 16) {
          setTheme("app warm");
        }
        if (weather.main.temp <= 0 && weather.main.temp >= -10) {
          setTheme("app cool");
        }
        if (weather.main.temp < -10) {
          console.log("cold");
          setTheme("app cold");
        }
      }
    } else {
      setTheme("app init");
    }
  }, [theme]);

  return (
    <div className={theme}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Location . . . "
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="temp">{Math.round(weather.main.temp)}°c</div>{" "}
                <div className="weather">{weather.weather[0].main}</div>
                <div className="details">
                  Feels like: {Math.round(weather.main.feels_like)}°c
                </div>
                <div className="details">
                  Wind Speed: {weather.wind.speed} m/s, {weather.wind.deg}°
                </div>
                <div className="details">
                  Humidity: {weather.main.humidity}%
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="weather-box"
            style={{ marginTop: "20vh", color: "white" }}
          >
            <h1 style={{ marginTop: "100px", fontSize: "60px" }}>
              React Weather App
            </h1>
            <h4 style={{ marginTop: "100px", fontSize: "40px" }}>
              By: Soham Parmar
            </h4>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
