import { Spin } from "antd";
import Search from "antd/lib/input/Search";
import { map } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDataStart } from './slice';

const WeatherForeCast = () => {
  const [coordinate, setCoordinate] = useState();
  const dispatch = useDispatch();
  const weathers = useSelector(state => state.weatherForeCast.weathers);
  const loading = useSelector(state => state.weatherForeCast.loading);

  navigator.geolocation.getCurrentPosition(position => {
    const { coords: { latitude, longitude }} = position;

    setCoordinate(`${latitude}, ${longitude}`);
  });

  const onSearch = useCallback(value => {
    dispatch(fetchDataStart({
      query: value
    }));
  }, [dispatch]);

  useEffect(() => {
    coordinate && dispatch(fetchDataStart({
      lattlong: coordinate
    }));
  }, [dispatch, coordinate]);

  return (
    <Spin spinning={loading}>
      <h2>Weather Forecast</h2>
      <div>Search: </div>
      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      <div className='result'>
        { map(weathers, w => (
          <div>
            <p>{w.title}</p>
            <p>{w.location_type}</p>
            <p>{w.woeid}</p>
            <p>{w.latt_long}</p>
            <br/>
            <br/>
          </div>
          )
        )}
      </div>
    </Spin>
  );
};

export default WeatherForeCast;