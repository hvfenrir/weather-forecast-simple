// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn()
  };
};

const mockGeolocation = {
  getCurrentPosition: (fn) => {
    const position = { coords: { latitude: 123, longitude: 321 }};

    fn(position);
  },
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;