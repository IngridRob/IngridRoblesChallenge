describe('Prueba',()=>{
    it('capturar Tags',()=>{
        cy.intercept('GET','/api/tags',{fixture:'tags.json'})
        cy.visit('https://conduit.bondaracademy.com/')
    
      cy.contains('Azul')
    })
   

})
