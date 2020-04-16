import PostcodeLookup from '.';
import { render } from '@testing-library/svelte';

describe('<PostcodeLookup />', () => {
  describe('when response is passed in as a prop', () => {
    let response;

    let listAddresses;

    beforeEach(() => {
      listAddresses = jest.fn(() => [['1', 'TESTING']]);
      response = { listAddresses };
    });

    it('renders the <Select/> component', () => {
      const { container } = render(PostcodeLookup, { response });
      expect(container.querySelector('select')).toBeInTheDocument();
    });
  });
});