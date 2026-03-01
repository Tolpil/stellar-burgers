describe('Тесты для конструктора бургера', () => {
  beforeEach(() => {
    // Установим размер экрана для тестов
    cy.viewport(1920, 1080);
    
    // Посетим главную страницу перед каждым тестом
    cy.visit('/');
  });

  it('Должен отображать список ингредиентов', () => {
    // Проверим, что ингредиенты отображаются
    cy.get('[data-cy=ingredient-item]').should('have.length.greaterThan', 0);
  });

  it('Должен добавлять ингредиенты в конструктор', () => {
    // Найдем первый ингредиент и кликнем по нему
    cy.get('[data-cy=ingredient-item]').first().click();
    
    // Проверим, что ингредиент добавился в конструктор
    cy.get('[data-cy=constructor-item]').should('have.length.greaterThan', 0);
  });

  it('Должен перемещать ингредиенты в конструкторе', () => {
    // Добавим несколько ингредиентов
    cy.get('[data-cy=ingredient-item]').eq(0).click();
    cy.get('[data-cy=ingredient-item]').eq(1).click();
    cy.get('[data-cy=ingredient-item]').eq(2).click();
    
    // Проверим, что ингредиенты добавились
    cy.get('[data-cy=constructor-item]').should('have.length', 3);
    
    // TODO: Добавить проверку перемещения ингредиентов
    // (это может потребовать дополнительной настройки draggable тестов)
  });

  it('Должен удалять ингредиенты из конструктора', () => {
    // Добавим ингредиент
    cy.get('[data-cy=ingredient-item]').first().click();
    
    // Найдем кнопку удаления и кликнем по ней
    cy.get('[data-cy=remove-ingredient]').first().click();
    
    // Проверим, что ингредиент удалился
    cy.get('[data-cy=constructor-item]').should('have.length', 0);
  });

  it('Должен открывать модальное окно с деталями ингредиента', () => {
    // Кликнем по первому ингредиенту
    cy.get('[data-cy=ingredient-item]').first().click();
    
    // Проверим, что открылось модальное окно
    cy.get('[data-cy=modal]').should('be.visible');
    
    // Проверим наличие информации об ингредиенте
    cy.get('[data-cy=ingredient-name]').should('be.visible');
    cy.get('[data-cy=ingredient-calories]').should('be.visible');
    
    // Закроем модальное окно
    cy.get('[data-cy=modal-close]').click();
    
    // Проверим, что модальное окно закрылось
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Должен оформлять заказ', () => {
    // Добавим ингредиенты в конструктор
    cy.get('[data-cy=ingredient-item]').eq(0).click();
    cy.get('[data-cy=ingredient-item]').eq(1).click();
    cy.get('[data-cy=ingredient-item]').eq(2).click();
    
    // Нажмем кнопку оформления заказа
    cy.get('[data-cy=order-button]').click();
    
    // TODO: Добавить проверку авторизации и оформления заказа
    // (это может потребовать мокирования API вызовов)
  });
});