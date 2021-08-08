import dayjs from 'dayjs';
import { get } from 'lodash-es';
import { memo, useCallback, useState } from 'react';

import { DAY_OF_WEEK } from 'constant/day';
import { WEATHER_ICON_URL } from 'containers/weather-forecast/constant';

import IconLocation from './components/IconLocation';
import WeatherInfo from './components/WeatherInfo';
import Weeks from './components/Weeks';
import './style.less';

const Weather = memo(({ weather = {}, daysOfWeek }) => {
  const [woeidActive, setWoeidActive] = useState(0);
  const activatedWeather = get(weather, `consolidated_weather.${woeidActive}`, {});
  const {
    the_temp,
    min_temp,
    max_temp,
    humidity,
    weather_state_abbr = 'hr',
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
            {woeidActive === 0 ? 'Today' : DAY_OF_WEEK[daysOfWeek[woeidActive]]}
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