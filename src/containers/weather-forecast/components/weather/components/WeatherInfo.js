import { memo } from 'react';

const WeatherInfo = memo(({ air_pressure, humidity, wind_speed }) => {
  return (
    <div className="today-info-container">
      <div className="today-info">
        <div className="precipitation">
          <span className="title">AIR PRESSURE</span>
          <span className="value">{air_pressure} atm</span>
          <div className="clear"></div>
        </div>
        <div className="humidity">
          <span className="title">HUMIDITY</span>
          <span className="value">{humidity} %</span>
          <div className="clear"></div>
        </div>
        <div className="wind">
          <span className="title">WIND</span>
          <span className="value">{wind_speed?.toFixed(0)} km/h</span>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
});

export default WeatherInfo;