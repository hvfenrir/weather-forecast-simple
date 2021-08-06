
import dayjs from 'dayjs';
import { map } from 'lodash-es';
import { memo } from 'react';
import { WEATHER_ICON_URL } from 'containers/weather-forecast/constant';

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
          const weekDayActiveClass = woeidActive === i ? 'active' : '';

          return (
            <li
              key={`dayWeather-${dayWeather.woeid}-${i}`}
              className={`week-day-${i} ${weekDayActiveClass}`}
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

export default Weeks;