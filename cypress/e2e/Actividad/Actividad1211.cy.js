describe('Datos hotel',{testIsolation:false},()=>{

    it('Visitar la página y verificar las imagenes en la página',()=>{

        cy.visit('https://automationintesting.online/')
        cy.get('img[src="/images/rbp-logo.jpg"]').should('be.visible')

        cy.get('img[src="/images/room2.jpg"]').should('be.visible')
    })


    it('Verificar que la información del hotel esté presente en la página',()=>{

        cy.get('.contact > :nth-child(3) > :nth-child(1)').should('be.visible')
        cy.get('.contact > :nth-child(3) > :nth-child(2)').should('be.visible')
        cy.get('.contact > :nth-child(3) > :nth-child(3)').should('be.visible')
        cy.get('.contact > :nth-child(3) > :nth-child(4)').should('be.visible')

    })

    it('Confirma que el texto de la descripción del hotel sea el esperado',()=>{

        cy.contains('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.')
            
        
    })


})
