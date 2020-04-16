const initPlugin = (window, targetId, config = {}) => {
  const $target = window.document.getElementById(targetId);
  return window.FirstclasspostcodesPlugin($target, config);
};

const targetId = 'postcode-lookup-form';
const apiKey = Cypress.env('API_KEY')
const endpoint = Cypress.env('API_URL');

describe('FirstclasspostcodesPlugin', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));
    cy.window().then((window) => initPlugin(window, targetId, {
      apiKey, 
      apiOverrides: {
        endpoint,
      },
    }));
  });

  beforeEach(() => {
    const fixturesUrl = `${Cypress.env('API_URL')}/data/.postcodes`;

    cy.request({ url: fixturesUrl })
      .then((res) => res.body)
      .then((fixtures) => fixtures[Math.floor(Math.random() * fixtures.length)])
      .as('fixture');
  });

  it('initializes', () => (
    cy.window().then((window) => {
      expect(typeof window.FirstclasspostcodesPlugin).to.equal('function');
    })
  ));

  describe('<PostcodeLookup />', () => {
    describe('basic usage', () => {
      it('correctly inputs an address into a form', () => {
        cy.get(`#${targetId}`).as('root');
        cy.get('@fixture').then(({ postcode }) => cy.get('@root').find('input[type=text]').type(postcode));
        cy.get('@root').find('button[type=submit]').click();
        cy.get('@root').find('select').children().eq(1).as('selectedOption');
        cy.get('@selectedOption').then((option) => cy.get('@root').find('select').select(option.val()));
        cy.get('@fixture').then(({ postcode }) => cy.get('[data-address-postcode]').should('have.value', postcode));
        cy.get('@selectedOption').then(($option) => {
          cy.root().get('[data-address-line1]').should(($input) => {
            expect($option.text()).to.contain($input.val());
          });
        });
      });
    });
  });
});
