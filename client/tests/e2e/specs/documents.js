// https://docs.cypress.io/api/introduction/api.html

describe('General tests', () => {
    it('Visits the app main page', () => {
        cy.visit('/');
        cy.get('title').should('have.text', 'CPF/CNPJ Validator');
    });

    it('Visits the about page', () => {
        cy.visit('/');
        cy.get('a[href="/about"]').click();
        cy.location('pathname').should('eq', '/about');
    });

    it('Check about page content', () => {
        cy.visit('/about');
        cy.contains('h1', 'More information on github');
    });

    it('Input shoul have mask', () => {
        cy.visit('/');
        cy.get('input[class="input-cpf-cnpj"]')
            .type('12345678901')
            .should('have.value', '123.456.789-01');

        cy.get('input[class="input-cpf-cnpj"]')
            .clear()
            .type('12345678901234')
            .should('have.value', '12.345.678/9012-34');
    });

    it('Verify document values', () => {
        cy.visit('/');
        cy.get('input[class="input-cpf-cnpj"]').type('12345678909');

        // Valid document
        cy.get('button.primary').click();
        cy.get('div.v-messages__wrapper').should(
            'have.text',
            'The document number is valid!'
        );

        // Invalid document
        cy.get('input[class="input-cpf-cnpj"]')
            .clear()
            .type('12345678900');
        cy.get('button.primary').click();
        cy.get('div.v-messages__wrapper').should(
            'have.text',
            'The number you entered is NOT valid!'
        );
    });
});
