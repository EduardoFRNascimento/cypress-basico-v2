/// <reference types ="Cypress" />

describe('Curso Cypress Básico', function() {
    beforeEach(function() {
        cy.visit('https://demo.supply-access.totvs.app/workarea')
    }) 

        it('Faz Login e Acessa o Módulo de WMS', function(){
            cy.get('#Username').type('eduardo.fnascimento@totvs.com.br')
            cy.get('#Password').type('M@luany250601')
            cy.contains('Entrar')
                .click()
            
                cy.get('sa-workarea-product-card').contains('WMS')
                .should('be.visible')                                     
        })
    
    })