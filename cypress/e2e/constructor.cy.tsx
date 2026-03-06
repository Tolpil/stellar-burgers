/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  const bun = 'Краторная булка N-200i';
  const main = 'Биокотлета из марсианской Магнаты';

   beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();

    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('должен добавлять булку и начинку', () => {
    cy.contains(bun).parent().find('button').click();
    cy.get('.constructor-element').should('contain', `${bun} (верх)`);
    cy.get('.constructor-element').should('contain', `${bun} (низ)`);

    cy.contains(main).parent().find('button').click();
    cy.get('.constructor-element').should('contain', main);
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    cy.contains(bun).click();

    cy.get('#modals').should('be.exist');
    cy.get('#modals').contains('Детали ингредиента').should('be.exist');
    cy.get('#modals').contains(bun).should('be.visible');

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('#modals').should('not.visible');
  });

  it('должен закрывать модальное окно по клику на крестик', () => {
    cy.contains(bun).click();

    cy.get('#modals').should('be.exist');
    cy.get('[data-cy=modal-close]').should('be.exist').click();

    cy.get('#modals').should('not.visible');
  });

  it('должен оформить заказ и показать номер', () => {
    cy.contains(bun).parent().find('button').click();
    cy.contains(main).parent().find('button').click();

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder').its('response.body').then((body) => {
      expect(body.success).to.be.true;
      expect(body.order.number).to.eq(58321);
    });

    cy.get('#modals').contains('58321', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('#modals').should('not.visible');

    cy.get('.constructor-element').should('have.length.lessThan', 3);
  });
});
