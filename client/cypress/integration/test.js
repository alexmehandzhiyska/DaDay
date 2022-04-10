import mockData from './mockData';

describe('Login page', () => {
    it('Loads login page', () => {
        cy.visit('/login');
        cy.get('#login-form').should('exist');
    });

    it('Logs in the user when entered correct username and password', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name=password]').type(`${mockData.users[0].password}{enter}`);

        cy.url().should('include', '/share-day');
        cy.get('nav').should('contain', 'Log out');
    });

    it('Displays an error message when entered incorrect username or password', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(`${mockData.users[0].username}1`);
        cy.get('input[name=password]').type(`${mockData.users[0].password}1{enter}`);

        cy.get('.Toastify').should('have.text', 'Wrong username or password!');
    });
});

describe('Logout', () => {
    it('Logout logs out the user', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name="password"]').type(`${mockData.users[0].password}{enter}`);

        cy.wait(2000);
        cy.url().should('include', '/share-day');
        
        cy.get('nav').contains('Log out').click();
        cy.get('nav').should('contain', 'Login');
    })
});

describe('Share day', () => {
    it('Redirects to login page for non-authenticated user', () => {
        cy.visit('/share-day');

        cy.get('#login-form').should('exist');
    });

    it('Emotion selection loads on share day page', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name=password]').type(`${mockData.users[0].password}{enter}`);

        cy.wait(2000);
        cy.url().should('include', '/share-day');

        cy.get('.emotion-card').should('exist');
    });

    it('Emotion selection functionality works', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name=password]').type(`${mockData.users[0].password}{enter}`);

        cy.url().should('include', '/share-day');

        cy.get('.emotion-card').first().should('be.visible').click({force: true});

        cy.wait(2000);

        cy.get('#description-form').should('exist');
    });

    it('Note add works correctly', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name=password]').type(`${mockData.users[0].password}{enter}`);

        cy.url().should('include', '/share-day');

        cy.get('.emotion-card').first().should('be.visible').click({force: true});
        cy.get('#description-form textarea').should('exist');

        cy.get('#description-form textarea').type('test');
        cy.get('#description-form input').should('be.visible').click({force: true});

        cy.get('h1').should('contain', 'Thank you for your response! I\'d be glad to chat with you tomorrow too!');
    });
});

describe('All notes', () => {
    it('Loads all notes for authenticated users', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name=password]').type(`${mockData.users[0].password}{enter}`);

        cy.url().should('include', '/share-day');

        cy.visit('/notes/28');

        cy.get('.notes').should('contain', 'test');
        cy.get('.note-description').last().should('have.text', mockData.notes[1].description);
        cy.get('.note-date').last().should('have.text', `Date: ${mockData.notes[1].date}`);
        cy.get('.details-btn').last().should('exist');
    });

    it('Redirects to login page for non-authenticated users', () => {
        cy.visit('/notes/28');
        cy.get('#login-form').should('exist');
    });
});

describe('Details', () => {
    it('Loads details page for authenticated user', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name=password]').type(`${mockData.users[0].password}{enter}`);

        cy.url().should('include', '/share-day');

        cy.visit('/notes/28');

        cy.get('.details-btn').last().click({force: true});
        cy.get('.note-description').last().should('have.text', mockData.notes[1].description);
        cy.get('.note-date').last().should('have.text', `Date: ${mockData.notes[1].date}`);
        cy.get('.back-btn').should('exist');
    }); 

    it('Redirects to login page for NON-authenticated user', () => {
        cy.visit('/notes/28/68');

        cy.get('#login-form').should('exist');
    });
});

describe('Weekly Report', () => {
    it('Loads weekly report when the user is logged in', () => {
        cy.visit('/login');

        cy.get('input[name=username]').type(mockData.users[0].username);
        cy.get('input[name=password]').type(`${mockData.users[0].password}{enter}`);
    
        cy.url().should('include', '/share-day');
    
        cy.visit('/weekly-report/28');

        cy.get('h1').should('contain', 'Weekly report');
        cy.get('#report-chart').should('exist');
    });

    it('Loads weekly report when the user is NOT logged in', () => {
        cy.visit('/weekly-report/28');

        cy.get('h1').should('contain', 'Weekly report');
        cy.get('#report-chart').should('exist');
    });
});