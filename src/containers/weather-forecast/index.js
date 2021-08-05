import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Collapse, Divider, Row, Spin } from "antd";
import Search from "antd/lib/input/Search";
import { isNil, map } from "lodash-es";

import { getDaysOfWeek } from "utils/day";

import Weather from "./components/weather";
import { fetchDataStart, fetchWeatherStart } from './slice';

const { Panel } = Collapse;

const WeatherForeCast = () => {
  // State
  const [coordinate, setCoordinate] = useState();

  // Store
  const dispatch = useDispatch();
  const locations = useSelector(state => state.weatherForeCast.locations);
  const loading = useSelector(state => state.weatherForeCast.loading);
  const weather = useSelector(state => state.weatherForeCast.weather);
  const loadingWeather = useSelector(state => state.weatherForeCast.loadingWeather);

  // Gets
  const dayOfWeekFromToday = useMemo(() => getDaysOfWeek(6), []);

  // Handlers
  const onSearch = useCallback(value => {
    dispatch(fetchDataStart({
      query: value
    }));
  }, [dispatch]);

  const onChangeCollapse = useCallback(value => {
    if (isNil(value)) return;
    if (!weather[value]) dispatch(fetchWeatherStart(value));
  }, [dispatch, weather]);

  // Side Effects
  // Asking permission for location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude }} = position;
  
      setCoordinate(`${latitude}, ${longitude}`);
    });
  }, []);

  useEffect(() => {
    coordinate && dispatch(fetchDataStart({
      lattlong: coordinate
    }));
  }, [dispatch, coordinate]);

  const locationsPanel = useMemo(() => map(locations, location => (
    <Panel header={location.title} key={location.woeid}>
      <Spin spinning={loadingWeather}>
        <Weather weather={weather[location.woeid]} dayOfWeekFromToday={dayOfWeekFromToday}/>
      </Spin>
    </Panel>
    )
  ), [locations, weather, dayOfWeekFromToday, loadingWeather]);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={18} offset={3}>
          <h1 style={{ color: 'white' }}>Weather Forecast</h1>
          <Search placeholder="Search City..." onSearch={onSearch} style={{ width: '300px' }} />
          <Divider dashed />
          <Collapse accordion onChange={onChangeCollapse}>
            {locationsPanel}
          </Collapse>
        </Col>
      </Row>
    </Spin>
  );
};

export default WeatherForeCast;