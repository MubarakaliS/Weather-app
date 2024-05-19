import React from "react";

import wind from "../assets/wind.png";
import humitity from "../assets/humitity.png";

const WeatheDetail = (props) => {
  return (
    <>
      <div className="image">
        <img src={props.icon} alt="Image" />
      </div>
      <div className="temp">{props.temp}°C</div>
      <div className="location">{props.city}</div>
      <div className="country">{props.country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitute</span>
          <span>{props.lat}</span>
        </div>
        <div>
          <span className="lag">Logtitute</span>
          <span>{props.log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humitity} alt="humitity" className="icon" />
          <div className="data">
            <div className="humitity-percent">{props.humitity}%</div>
            <div className="text">Humitity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className="wind-icon" />
          <div className="data">
            <div className="wind-percent">{props.wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatheDetail;
