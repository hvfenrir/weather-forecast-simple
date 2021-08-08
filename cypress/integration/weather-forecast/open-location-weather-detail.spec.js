/// <reference types="cypress" />

import searchLocations from '../../fixtures/weather-forecast/search-locations.json';
import locationWeatherDetail from '../../fixtures/weather-forecast/location-weather-detail.json';

context('Detail weather', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    cy.intercept('GET', '**/location/search*', { fixture: 'weather-forecast/search-locations' }).as('searchedLocations')
    cy.intercept('GET', '**/location/2487956', { fixture: 'weather-forecast/location-weather-detail' }).as('weatherDetail')
  })

  it('should get correct weather detail when type keyword and search and open collapse', () => {
    cy.get('.ant-input').type('San Francisco{enter}');
    cy.get('.ant-collapse-item').should(
      'contain.text',
      searchLocations[0].title,
    );
    cy.get('.ant-collapse-item').click();
    cy.get('.weather-side').should(
      'contain.text',
      locationWeatherDetail.title
    ).should(
      'contain.text',
      locationWeatherDetail.consolidated_weather[0].the_temp.toFixed(0)
    )

    // Click other weather day item
    cy.get('.week-day-2').click();
    cy.get('.weather-side').should(
      'contain.text',
      locationWeatherDetail.consolidated_weather[2].weather_state_name
    ).should(
      'contain.text',
      locationWeatherDetail.consolidated_weather[2].the_temp.toFixed(0)
    )
  })
})
