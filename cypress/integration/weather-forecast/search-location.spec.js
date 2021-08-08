/// <reference types="cypress" />

import searchLocations from '../../fixtures/weather-forecast/search-locations.json';

context('Search Location', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    cy.intercept('GET', '**/location/search*', { fixture: 'weather-forecast/search-locations' }).as('searchedLocations')
  })

  it('should get correct data when type keyword and search', () => {
    cy.get('.ant-input').type('San Francisco{enter}');
    cy.get('.ant-collapse-item').should(
      'contain.text',
      searchLocations[0].title,
    );
  })
})
