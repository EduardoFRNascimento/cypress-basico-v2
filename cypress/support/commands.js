Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Eduardo Francisco')
    cy.get('#lastName').type('do Nascimento')
    cy.get('#email').type('edhuardo030@gmail.com')
    cy.get('#open-text-area').type('Primeiro treinamento referente a automatização de testes' , { delay:0} )      
    cy.contains('button', 'Enviar').click()
    
})