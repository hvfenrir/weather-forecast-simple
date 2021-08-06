import { memo, useCallback, useMemo } from "react";
import { Col, Collapse, Divider, Row, Spin } from "antd";
import dayjs from "dayjs";
import Search from "antd/lib/input/Search";
import { isNil, map } from "lodash-es";

import { getDaysOfWeek } from "utils/day";
import Weather from "../weather";

const { Panel } = Collapse;

const WeatherForeCastInfo = memo(({
  data,
  onSearch,
  onOpenDetail
}) => {
  const {
    locations,
    loading,
    weather,
    loadingWeather
  } = data;
 
  // Gets
  const today = dayjs().day();
  const dayOfWeekFromToday = useMemo(() => getDaysOfWeek(today, 6), [today]);
  const locationPanels = useMemo(() => map(locations, location => (
    <Panel key={location.woeid} header={location.title}>
      <Spin spinning={loadingWeather}>
        <Weather
          weather={weather[location.woeid]}
          daysOfWeek={dayOfWeekFromToday}
        />
      </Spin>
    </Panel>
  )), [locations, loadingWeather, weather, dayOfWeekFromToday]);

  // Handlers
  const onChangeCollapse = useCallback(value => {
    if (isNil(value)) return;
    if (!weather[value]) onOpenDetail(value);
  }, [weather, onOpenDetail]);
  
  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={18} offset={3}>
          <h1 style={{ color: 'white' }}>Weather Forecast</h1>
          <Search placeholder="Search City..." onSearch={onSearch} style={{ width: '300px' }} />
          <Divider dashed />
          <Collapse accordion onChange={onChangeCollapse}>
            {locationPanels}
          </Collapse>
        </Col>
      </Row>
    </Spin>
  );
});
WeatherForeCastInfo.displayName = 'WeatherForeCastInfo';

export default WeatherForeCastInfo;