/// <reference types="cypress" />

import locationsCoordinate from '../../fixtures/weather-forecast/locations-coordinate.json';

context('Start Load Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    cy.intercept('GET', '**/location/*', { fixture: 'weather-forecast/locations-coordinate' }).as('locationsCoordinated')
  })

  it('start load locations when get coordinates', () => {
    cy.get('.ant-collapse-item').should(
      'contain.text',
      locationsCoordinate[0].title,
    );
  })
})
