import { combineReducers } from 'redux';
import weatherForeCastReducer from 'containers/weather-forecast/slice';

const rootReducer = () => {
  const appReducer = combineReducers({
    weatherForeCast: weatherForeCastReducer
  });

  return appReducer;
};

export default rootReducer;