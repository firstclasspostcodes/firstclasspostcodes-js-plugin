import Input from './Input.svelte';
import { axe } from 'jest-axe';
import { render, fireEvent, act } from '@testing-library/svelte';

describe('<Input />', () => {
  const classNames = {
    container: 'test--container',
    label: 'test--label',
    text: 'test--text',
    button: 'test--button',
  };

  

  it('has no detectible accessibility violations', () => {
    const { container } = render(Input);
    expect(axe(container)).resolves.toHaveNoViolations();
  });

  it('sets className properties correctly', () => {
    const { getByTestId } = render(Input, { classNames });
    const container = getByTestId('container');
    const label = container.querySelector('label');
    const text = container.querySelector('input[type=text]');
    const button = container.querySelector('button');

    expect(container).toHaveClass('test--container');
    expect(label).toHaveClass('test--label');
    expect(text).toHaveClass('test--text');
    expect(button).toHaveClass('test--button');
  });

  describe('when there is a default value, or it is updated', () => {
    let getClient;

    let getAutocomplete;

    beforeEach(() => {
      getAutocomplete = jest.fn(() => ({ listCompletions: () => ['TESTING'] }));
      getClient = jest.fn(() => ({ getAutocomplete }));
    });

    afterEach(() => {
      expect(getClient).toHaveBeenCalled();
      expect(getAutocomplete).toHaveBeenCalled();
    })

    it('sets a default value for input', () => {
      const value = 'ab30';
      const { container } = render(Input, { value, getClient });
      const text = container.querySelector('input[type=text]');
      expect(text.value).toEqual(value);
    });

    it('calls onLookup when the input is submitted', () => {
      const testValue = 'testing';
      const onLookup = jest.fn();
      const { container } = render(Input, { onLookup, getClient });
      const text = container.querySelector('input[type=text]');
      const button = container.querySelector('button');
      text.value = testValue;
      fireEvent.input(text);
      fireEvent.click(button);
      expect(onLookup).toHaveBeenCalledTimes(1);
      expect(onLookup).toHaveBeenCalledWith(testValue);
    });

    it('adds autocomplete options to the datalist', async () => {
      const testValue = 'ab30';
      const { container } = render(Input, { getClient });
      const text = container.querySelector('input[type=text]');
      text.value = testValue;
      await act(() => fireEvent.input(text));
      expect(getAutocomplete).toHaveBeenCalledWith(testValue);
      const datalist = container.querySelector('datalist');
      expect(datalist).not.toBeEmpty();
    });
  });
});