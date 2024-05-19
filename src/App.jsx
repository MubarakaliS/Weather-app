import "./App.css";
import searchIcon from "./assets/search.png";

import { useEffect, useState } from "react";
import WeatheDetail from "./components/WeatheDetail";

import snowIcon from "./assets/snow.png";
import clearIcon from "./assets/clearIcon.png";
import cloudIcon from "./assets/cloudIcon.png";
import drizzleIcon from "./assets/drizzleIcon.png";
import rainIcon from "./assets/rainIcon.png";
function App() {
  const [text, setText] = useState("Chennai");

  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humitity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [error, setError] = useState(null);
  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    const api_key = "fa06c106b2834cffe721bea292435883";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metrics`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod == "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setCity(data.name);
      setTemp(Math.floor(data.main.temp));
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
      setError(null);
    } catch (error) {
      console.error("An error occured", error.message);
      setError("An error occured while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search" style={{ height: "20px" }} />
          </div>
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}
        {!loading && !cityNotFound && !error && (
          <WeatheDetail
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            humitity={humitity}
            wind={wind}
          />
        )}
      </div>
    </>
  );
}

export default App;
