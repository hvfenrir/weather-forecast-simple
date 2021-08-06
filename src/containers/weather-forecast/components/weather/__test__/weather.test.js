import { render, screen, fireEvent } from '@testing-library/react';

import Weather from '../index';
import { WEATHER } from 'containers/weather-forecast/test.data';

const daysOfWeek = [0, 1, 2, 3, 4, 5];

test('renders weather info', () => {
  render(<Weather weather={WEATHER} daysOfWeek={daysOfWeek} />);

  const element = screen.getByText(/Today/i);
  expect(element).toBeInTheDocument();
});

test('click event on weather day of week should active that item', () => {
  const { container } = render(<Weather weather={WEATHER} daysOfWeek={daysOfWeek} />);
  fireEvent.click(container.querySelector('.week-day-2'))

  const element = screen.getByText(/Tuesday/i);
  expect(element).toBeInTheDocument();
  expect(container.querySelector('.week-day-2')).toHaveClass('active')
});
