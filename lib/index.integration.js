const setup = async (window, config = {}) => {
  const { Firstclasspostcodes, FirstclasspostcodesPlugin } = window;

  const client = Firstclasspostcodes(Cypress.env('API_KEY'), config.apiOverrides);

  const fixtures = await client.request({ path: '/data/.postcodes' });

  const fixture = fixtures[Math.floor(Math.random() * fixtures.length)];

  const targetId = 'postcode-lookup-form';

  const $target = window.document.getElementById(targetId);

  FirstclasspostcodesPlugin($target, config);

  return { 
    fixture, 
    targetId,
  };
};

describe('FirstclasspostcodesPlugin', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));
  });

  it('initializes', () => (
    cy.window().then((window) => {
      expect(typeof window.FirstclasspostcodesPlugin).to.equal('function');
    })
  ));

  describe('<PostcodeLookup />', () => {
    let endpoint;

    let apiKey;

    beforeEach(() => {
      apiKey = Cypress.env('API_KEY')
      endpoint = Cypress.env('API_URL');
    });

    describe('basic usage', () => {
      beforeEach(() => {
        cy.window().then((window) => setup(window, {
          apiKey, 
          apiOverrides: {
            endpoint,
          },
        })).as('setup');
      });

      it('correctly inputs an address into a form', () => {
        cy.get('@setup').then(({ targetId, fixture }) => {
          cy.get(`#${targetId}`).within(() => {
            cy.get('input[type=text]').type(fixture.postcode);
            cy.get('button[type=submit]').click();
            cy.get('select').children().eq(1).as('selectedOption').then((option)  => {
              cy.get('select').select(option.val());
            });
          });
        });

        cy.get('@selectedOption').then(($option) => {
          cy.root().get('[data-address-line1]').should(($input) => {
            expect($option.text()).to.contain($input.val());
          });
        });

        cy.get('@setup').then(({ fixture }) => {
          cy.root().get('[data-address-postcode]').should('have.value', fixture.postcode)
        });
      });
    });
  });
});
