import Select from './Select.svelte';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/svelte';

describe('<Select />', () => {
  let addresses;

  const classNames = {
    container: 'test--container',
    label: 'test--label',
    select: 'test--select',
  };

  beforeEach(() => {
    addresses = [];
  });

  it('has no detectible accessibility violations', () => {
    const { container } = render(Select, { addresses });
    expect(axe(container)).resolves.toHaveNoViolations();
  });

  it('sets className properties correctly', () => {
    const { getByTestId } = render(Select, { addresses, classNames });
    const container = getByTestId('container');
    const label = container.querySelector('label');
    const select = container.querySelector('select');

    expect(container).toHaveClass('test--container');
    expect(label).toHaveClass('test--label');
    expect(select).toHaveClass('test--select');
  });

  describe('when no addresses are provided', () => {
    it('displays "no addresses found"', () => {
      const { getByText } = render(Select, { addresses, classNames });
      expect(getByText('No addresses found')).toBeInTheDocument();
    });
  });

  describe('when a list of addresses are provided', () => {
    const optionText = '1 first avenue';

    const optionValue = 'a:1';

    beforeEach(() => {
      addresses = [
        [optionValue, optionText],
      ];
    });

    it('displays the correct address and value', () => {
      const { getByText } = render(Select, { addresses, classNames });
      const option = getByText(optionText);
      expect(option.value).toEqual(optionValue);
    });

    describe('when an address is selected', () => {
      it('triggers an onChange call', () => {
        const onSelected = jest.fn();
        const { container } = render(Select, { addresses, onSelected });
        const select = container.querySelector('select');
        Array.from(select.children).forEach(option => {
          option.selected = option.value === optionValue;
        });
        fireEvent.change(select);
        expect(onSelected).toHaveBeenCalledTimes(1);
        expect(onSelected).toHaveBeenCalledWith(optionValue);
      });
    });
  });
});