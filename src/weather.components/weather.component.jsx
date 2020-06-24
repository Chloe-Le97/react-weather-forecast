import React from "react";
import "./weather.style.css";

const Weather = (props) => {
  return (
    <div className="weather">
      <h1 className="title">
        {props.city}, {props.country}
      </h1>
      <div className="icon">
        <i className={`wi ${props.weatherIcon}`} style={{ fontSize: 45 }}></i>
      </div>
      <div className="temperature">{props.temperature}°C</div>
      <div className="description">{props.description}</div>
    </div>
  );
};

export default Weather;
