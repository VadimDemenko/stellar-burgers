/// <reference types="cypress" />

describe('Приложение', () => {
    before(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
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
        cy.contains(ingredient).click();
        cy.get('[data-cy="modal"]').should('exist');
        cy.get('[data-cy="modal-title"]').should('contain.text', 'Детали ингредиента');
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
        cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
        cy.get('div').contains('Выберите булки').should('not.exist');
      });
  
      it('Добавление начинки', () => {
        cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
        cy.get('div').contains('Выберите начинку').should('not.exist');
      });
    });
  
    describe('Заказ', () => {
      it('Оформление заказа', () => {
        cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('order');
        cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
        cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
        cy.contains('Оформить заказ').click();
        cy.wait('@order').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy="order-number"]').should('contain.text', '3031');
      });
    });
  });
  