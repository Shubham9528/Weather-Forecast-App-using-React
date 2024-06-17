import React, { useState } from "react";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import Selectcountry from "./Selectcountry";
import LightModeIcon from "@mui/icons-material/LightMode";

function App() {
  
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
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
  const [data, setData] = useState({
    temperature: "",
    location: "",
    windSpeed: "",
    rain: "",
    snow: "",
    localTime: "",
  });
  
  const [area, setArea] = useState("pune");
  function handleArea(data) {
    setArea(data);
    //alert(data);
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=7728cb3ae7334f8997375554241006&q=${area}&aqi=yes
`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);

      setData({
        snow: data.current.dewpoint_c,
        temperature: data.current.temp_c,
        location: data.location.name,
        windSpeed: data.current.wind_kph,
        rain: data.current.precip_mm,
        airQuality: data.current.air_quality,
        localTime: data.location.localtime
      });
      
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
    
    const date = new Date(data.localTime);
    
  return (
    <div className="container">
      <div className="temperature">
      {date.getHours() >= 20 || date.getHours() < 6 ? (
        <NightlightIcon />
      ) : (
        <LightModeIcon />
      )}

        <p>
          {months[date.getMonth()]}, {day[date.getDay() - 1]} {date.getDate()}
        </p>
        <p>
          {date.getHours().toString().padStart(2, "0")}:
          {date.getMinutes().toString().padStart(2, "0")}:
          {date.getSeconds().toString().padStart(2, "0")}
        </p>
        <h1>
          {data.temperature}
          <sup>o</sup>
          C
        </h1>

        <h2>{data.location.toUpperCase()}</h2>
        <div className="weather-data">
          <div>
            <AcUnitIcon />
            <p>{data.snow}</p>
          </div>
          <div>
            <WaterDropIcon />
            <p>{data.rain}%</p>
          </div>
          <div>
            <AirIcon />
            <p>{data.windSpeed} mph</p>
          </div>
        </div>
        <div className="button">
          <Selectcountry location={handleArea} />
        </div>
      </div>
    </div>
  );
}

export default App;
