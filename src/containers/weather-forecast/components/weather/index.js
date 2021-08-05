import dayjs from 'dayjs';
import { get, map } from 'lodash-es';
import { memo, useCallback, useState } from 'react';

import { DAY_OF_WEEK } from 'constant/day';
import { WEATHER_ICON_URL } from 'containers/weather-forecast/constant';

import './style.less';

const IconLocation = memo(() =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="feather feather-map-pin location-icon">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

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

const Weeks = memo(({
  consolidatedWeather = [],
  onClickWoe,
  woeidActive
}) => {
  return (
    <div className="week-container">
      <ul className="week-list">
        { map(consolidatedWeather, (dayWeather, i) => {
          const onClick = () => onClickWoe(i);

          return (
            <li
              key={`dayWeather-${dayWeather.woeid}-${i}`}
              className={woeidActive === i ? 'active' : ''}
              onClick={onClick}
            >
              <img
                alt='weather-icon'
                width='24px'
                src={`${WEATHER_ICON_URL}/${dayWeather.weather_state_abbr}.svg`}
                className="feather feather-cloud-snow day-icon"
              />
              <span className="day-name">{dayjs(dayWeather.applicable_date).format("D MMM YYYY")}</span>
              <span className="day-temp">{dayWeather.min_temp.toFixed(0)}°C / {dayWeather.max_temp.toFixed(0)}°C</span>
            </li>
            );
          })
        }
      </ul>
    </div>
  );
});

const Weather = memo(({ weather = {}, dayOfWeekFromToday }) => {
  const [woeidActive, setWoeidActive] = useState(0);
  const activatedWeather = get(weather, `consolidated_weather.${woeidActive}`, {});
  const {
    the_temp,
    min_temp,
    max_temp,
    humidity,
    weather_state_abbr,
    weather_state_name,
    wind_speed,
    applicable_date,
    air_pressure
  } = activatedWeather;

  const onClickWoe = useCallback(woeid => {
    setWoeidActive(woeid);
  }, []);

  return (
    <div className="container">
      <div className="weather-side">
        <div className="weather-gradient"></div>
        <div className="date-container">
          <h2 className="date-dayname">
            {woeidActive === 0 ? 'Today' : DAY_OF_WEEK[dayOfWeekFromToday[woeidActive]]}
          </h2>
          <span className="date-day">{dayjs(applicable_date).format("D MMM YYYY")}</span>
          <IconLocation />
          <span className="location">{weather.title}</span>
        </div>
        <div className="weather-container">
          <img
            alt='weather-icon'
            width='24px'
            src={`${WEATHER_ICON_URL}/${weather_state_abbr}.svg`}
            className="feather weather-icon"
          />
          <h1 className="weather-temp">
            {the_temp?.toFixed(0)}°C
          </h1>
          <p>{min_temp?.toFixed(0)}°C / {max_temp?.toFixed(0)}°C</p>
          <h3 className="weather-desc">{weather_state_name}</h3>
        </div>
      </div>
      <div className="info-side">
        <WeatherInfo
          air_pressure={air_pressure}
          humidity={humidity}
          wind_speed={wind_speed}
        />
        <Weeks
          consolidatedWeather={weather.consolidated_weather}
          onClickWoe={onClickWoe}
          woeidActive={woeidActive}
        />
      </div>
    </div>
  );
});

export default Weather;