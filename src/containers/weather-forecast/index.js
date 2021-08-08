import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGeoLocation } from "hooks/useGeoLocation";

import WeatherForeCastInfo from "./components/weather-forecast-info";

import { fetchDataStart, fetchWeatherStart } from './slice';

const WeatherForeCastContainer = () => {
  // State
  const coordinate = useGeoLocation();

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