/// <reference types ="Cypress" />

describe('Curso Cypress Básico', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    }) 

        it('verificar o titulo da aplicação WEB', function() {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        it('preenche os campos obrigatórios e envia o formulário', function() {
            const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste,  '

            cy.clock()

            cy.get('#firstName').type('Eduardo Francisco')
            cy.get('#lastName').type('do Nascimento')
            cy.get('#email').type('edhuardo030@gmail.com')
            cy.get('#open-text-area').type(longText, { delay:0})      
            cy.contains('button', 'Enviar').click()

            cy.get('.success').should('be.visible')

            cy.tick(3000)

            cy.get('.success').should('not.be.visible')

        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
            cy.clock()

            cy.get('#firstName').type('Eduardo Francisco')
            cy.get('#lastName').type('do Nascimento')
            cy.get('#email').type('edhuardo030@gmail,com')
            cy.get('#open-text-area').type('Primeiro treinamento referente a automatização de testes' , { delay:0} )      
            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')

            cy.tick(3000)

            cy.get('.error').should('not.be.visible')

        })

        it('Campo telefone continua vazio quando preenchido um valor não-numérico', function(){
            cy.get('#phone')
                .type('abcdefghifk')
                .should('have.value', '')
        })

        it('Exibe mensagem de erro quando o telefone se torn obrigatório mas não é preenchido antes do envio do formulário', function(){
            cy.clock()
            
            cy.get('#firstName').type('Eduardo Francisco')
            cy.get('#lastName').type('do Nascimento')
            cy.get('#email').type('edhuardo030@gmail.com')
            cy.get('#open-text-area').type('Primeiro treinamento referente a automatização de testes' , { delay:0} )   
            cy.get('#phone-checkbox').check()   
            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')

            cy.tick(3000)

            cy.get('.error').should('not.be.visible')
        })

        it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
            cy.get('#firstName') 
            .type('Eduardo Francisco')
            .should('have.value', 'Eduardo Francisco')
            .clear()
            .should('have.value', '')
            
            cy.get('#lastName')
            .type('do Nascimento')
            .should('have.value', 'do Nascimento')
            .clear()
            .should('have.value', '')

            cy.get('#email')
            .type('edhuardo030@gmail.com')
            .should('have.value', 'edhuardo030@gmail.com')
            .clear()
            .should('have.value', '')

            cy.get('#phone')
            .type('47997823315')
            .should('have.value', '47997823315')
            .clear()
            .should('have.value', '')

            cy.get('#open-text-area')
            .type('Palmeiras não tem mundial')
            .should('have.value', 'Palmeiras não tem mundial')
            .clear()
            .should('have.value', '')
        })

        it('Exibe mensagem de erro ao submeter o formulário sem preencher os dados obrigatórios', function(){
            cy.clock()
                       
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')            
            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
        })

        it('Envia formulário com sucesso usando um comando customizado', function(){
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible')
        })
        
        it('Seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube')
        })

        it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
            cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
        })
        
        it('Seleciona um produto (Blog) por seu índice', function(){
            cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        })

        it('Marca o tipo de atendimento Feedback', function(){
            cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
        })

        it('Marca cada tipo de atendimento', function(){
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(function($radio){
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('be.checked')
                })
        })
        
        it('Marca ambos checkboxes, depois desmarca o último', function(){

            cy.get('input[type="checkbox"]')
                .check()
                .should('be.checked')
                .last()
                .uncheck()
                .should('not.be.checked') 
        })

        it('Seleciona um arquivo da pasta fixtures', function(){
            cy.get('input[type="file"]#file-upload')
                .selectFile('cypress/fixtures/example.json')
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json')
                })

                })

        it('Seleciona um arquivo simulando um Drag-and-Drop', function(){
            cy.get('input[type="file"]#file-upload')
                .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json')
                })
        })

        it('Selecione um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]#file-upload')
                .selectFile('@sampleFile')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
            cy.get('#privacy a').should('have.attr', 'target', '_blank')    
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
            cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        })
        
        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
            cy.get('.success')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Mensagem enviada com sucesso.')
              .invoke('hide')
              .should('not.be.visible')
            cy.get('.error')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Valide os campos obrigatórios!')
              .invoke('hide')
              .should('not.be.visible')
          })

          it('Preenche a area de texto usando o comando invoke', function() {
            const longText = Cypress._.repeat('0123456789', 20)
            
            cy.get('#open-text-area')
                .invoke('val', longText)
                .should('have.value', longText)
          })

          it('Faz uma requisição HTTP', function(){
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
                .should(function(response){
                    const { status, statusText, body} = response
                    expect(status).to.equal(200)
                    expect(statusText).to.equal('OK')
                    expect(body).to.include('CAC TAT')
                })
          })

          it.only('Desafio - Encontre o Gato', function(){
            cy.get('#cat')
            .invoke('show')
            .should('be.visible')              
        })

     
    })