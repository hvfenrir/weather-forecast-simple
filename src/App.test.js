import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import App from './App';

const initialState = {
  weatherForeCast: {
    locations: [],
    weather: {},
    loading: false,
    loadingWeather: false
  }
};
const mockStore = configureStore();

test('renders search element', () => {
  // arr
  const store = mockStore(initialState)

  // act
  render(<Provider store={store}><App /></Provider>);

  // assert
  const SearchElement = screen.getByPlaceholderText(/Search/i);
  expect(SearchElement).toBeInTheDocument();
});
