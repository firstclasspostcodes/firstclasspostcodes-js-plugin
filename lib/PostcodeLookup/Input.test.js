import Input from './Input.svelte';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/svelte';

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

  it('sets a default value for input', () => {
    const value = 'ab30';
    const { container } = render(Input, { value });
    const text = container.querySelector('input[type=text]');
    expect(text.value).toEqual(value);
  });

  it('calls onLookup when the input is submitted', () => {
    const testValue = 'testing';
    const onLookup = jest.fn();
    const { container, component } = render(Input, { onLookup });
    const text = container.querySelector('input[type=text]');
    const button = container.querySelector('button');
    text.value = testValue;
    fireEvent.input(text);
    fireEvent.click(button);
    expect(onLookup).toHaveBeenCalledTimes(1);
    expect(onLookup).toHaveBeenCalledWith(testValue);
  });
});