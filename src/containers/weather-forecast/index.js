import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import WeatherForeCastInfo from "./components/weather-forecast-info";

import { fetchDataStart, fetchWeatherStart } from './slice';

const WeatherForeCastContainer = () => {
  // State
  const [coordinate, setCoordinate] = useState();

  // Store
  const dispatch = useDispatch();
  const data = useSelector(state => state.weatherForeCast);

  // Handlers
  const onSearch = useCallback(value => {
    dispatch(fetchDataStart({
      query: value
    }));
  }, [dispatch]);

  const onOpenDetail = useCallback((value) => {
    dispatch(fetchWeatherStart(value));
  }, [dispatch])

  // Side Effects
  // Asking permission for location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude }} = position;
  
      setCoordinate(`${latitude}, ${longitude}`);
    });
  }, []);

  // Fetch data when gets coordinate user
  useEffect(() => {
    coordinate && dispatch(fetchDataStart({
      lattlong: coordinate
    }));
  }, [dispatch, coordinate]);

  return (
    <WeatherForeCastInfo
      data={data}
      onSearch={onSearch}
      onOpenDetail={onOpenDetail}
    />
  );
}

export default WeatherForeCastContainer;