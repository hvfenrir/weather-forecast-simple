import { render, screen, fireEvent } from '@testing-library/react';

import WeatherForeCastInfo from '../index';
import { LOCATIONS, WEATHER } from 'containers/weather-forecast/test.data';

test('renders weather forecast info', () => {
  const data = {
    locations: LOCATIONS,
    loading: false,
    weather: {},
    loadingWeather: false
  };

  const props = {
    data
  }
  render(<WeatherForeCastInfo {...props} />);

  const SearchElement = screen.getByPlaceholderText('Search City...');
  const title = screen.getByText('Weather Forecast');

  expect(SearchElement).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});

test('Click Search location should call onSearch', () => {
  const data = {
    locations: LOCATIONS,
    loading: false,
    weather: {
      2487956: WEATHER
    },
    loadingWeather: false
  };
  const onSearch = jest.fn();

  const props = {
    data,
    onSearch
  }
  render(<WeatherForeCastInfo {...props} />);

  const SearchElement = screen.getByPlaceholderText('Search City...');
  
  fireEvent.change(SearchElement, {target: {value: 'san'}})
  fireEvent.click(screen.getByLabelText('search'))

  expect(SearchElement).toBeInTheDocument();
  expect(onSearch).toHaveBeenCalledTimes(1);
});

test('Open panel location should call onOpenDetail for weather haven not gotten before', () => {
  const data = {
    locations: LOCATIONS,
    loading: false,
    weather: {},
    loadingWeather: false
  };
  const onOpenDetail = jest.fn();

  const props = {
    data,
    onOpenDetail
  }
  const { container } = render(<WeatherForeCastInfo {...props} />);
  const firstPanel = container.querySelectorAll('.ant-collapse-header[aria-expanded=false]')[0];

  fireEvent.click(firstPanel)

  expect(onOpenDetail).toHaveBeenCalledTimes(1);
});

test('Open panel location should not call onOpenDetail for weather have gotten before', () => {
  const data = {
    locations: LOCATIONS,
    loading: false,
    weather: {
      2487956: WEATHER
    },
    loadingWeather: false
  };
  const onOpenDetail = jest.fn();

  const props = {
    data,
    onOpenDetail
  }
  const { container } = render(<WeatherForeCastInfo {...props} />);
  const firstPanel = container.querySelectorAll('.ant-collapse-header[aria-expanded=false]')[0];

  fireEvent.click(firstPanel)

  expect(onOpenDetail).toHaveBeenCalledTimes(0);
});

test('Open panel location and close should call onOpenDetail once', () => {
  const data = {
    locations: LOCATIONS,
    loading: false,
    weather: {},
    loadingWeather: false
  };
  const onOpenDetail = jest.fn();

  const props = {
    data,
    onOpenDetail
  }
  const { container } = render(<WeatherForeCastInfo {...props} />);
  const firstPanel = container.querySelectorAll('.ant-collapse-header[aria-expanded=false]')[0];

  // Open
  fireEvent.click(firstPanel)
  // Close
  fireEvent.click(firstPanel)

  expect(onOpenDetail).toHaveBeenCalledTimes(1);
});