/// <reference types="cypress" />

describe('Приложение', () => {
  before(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
  });

  beforeEach(() => {
    cy.viewport(1300, 800);
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('user');
    cy.setCookie('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    window.localStorage.clear();
  });

  it('Моковые данные загружены', () => {
    cy.wait('@ingredients');
  });

  describe('Модальные окна', () => {
    const ingredient = 'Мясо бессмертных моллюсков Protostomia';

    it('Открытие окна', () => {
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.contains(ingredient).click();
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="modal-title"]').should(
        'contain.text',
        'Детали ингредиента'
      );
      cy.get('[data-cy="modal-content"]').should('contain.text', ingredient);
    });

    it('Закрытие окна (кнопка)', () => {
      cy.contains(ingredient).click();
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрытие окна (оверлей)', () => {
      cy.contains(ingredient).click();
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Конструктор', () => {
    it('Добавление булки', () => {
      cy.get('[data-cy="constructor-buns"]').should('contain.text', 'Выберите булки');
      cy.contains('Краторная булка N-200i')
        .parent()
        .contains('Добавить')
        .click();
      cy.get('[data-cy="constructor-buns"]')
        .should('exist')
        .and('contain.text', 'Краторная булка N-200i');
    });

    it('Добавление начинки', () => {
      cy.get('[data-cy="constructor-fillings"]')
        .children('.ingredient')
        .should('have.length', 0);
      cy.contains('Мясо бессмертных моллюсков Protostomia')
        .parent()
        .contains('Добавить')
        .click();
      cy.get('[data-cy="constructor-fillings"]')
        .children('.ingredient')
        .should('have.length', 1)
        .and('contain.text', 'Мясо бессмертных моллюсков Protostomia');
    });

    it('Оформление заказа', () => {
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
        'order'
      );

      cy.contains('Краторная булка N-200i')
        .parent()
        .contains('Добавить')
        .click();
      cy.get('[data-cy="constructor-buns"]').should('exist');

      cy.contains('Мясо бессмертных моллюсков Protostomia')
        .parent()
        .contains('Добавить')
        .click();
      cy.get('[data-cy="constructor-fillings"]')
        .children('.ingredient')
        .should('have.length', 1);

      cy.contains('Оформить заказ').click();
      cy.wait('@order').its('response.statusCode').should('eq', 200);
      cy.get('[data-cy="order-number"]').should('contain.text', '3031');

      cy.get('body').type('{esc}');
      cy.contains('3031').should('not.exist');
      cy.get('[data-cy="constructor-buns"]').should(
        'contain.text',
        'Выберите булки'
      );
      cy.get('[data-cy="constructor-fillings"]')
        .children('.ingredient')
        .should('have.length', 0);
    });
  });
});
