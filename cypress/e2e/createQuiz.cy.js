
describe('create a new quiz to the adminUser ',() =>{
  beforeEach( () => {
    cy.visit('http://localhost:4173')
    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('.username-input').type('adminUser')
    cy.get('.password-input').type('password123')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('include', '/discover')
    cy.get('[data-cy="create-new-quiz-button"]').click()
    cy.url().should('include', '/summary')
  })
  it('go to createQuiz and create a quiz (required fields)', () =>{
    cy.get('[data-cy="title-input"]').type('TestTitle')
    cy.get('[data-cy="description-input"]').type('This is a test-description')
    cy.get('[data-cy="category-selector"]').select('Math')
    cy.get('[data-cy="continue-button"]').click()
    cy.url().should('include', '/create-quiz')
    cy.get('[cy-data="input-question"]').type("is this a question?")
    cy.get('[cy-data="correct answer 1"]').click({force: true})
    cy.get('#alternative-1').type("This is the answer", )
    cy.get('#alternative-2').type("This is not the answer", )
    cy.get('#alternative-3').type("This is also not the answer", )
    cy.get('#alternative-4').type("not the answer", )
  })
  it('Assert if it has all the elements')
})

