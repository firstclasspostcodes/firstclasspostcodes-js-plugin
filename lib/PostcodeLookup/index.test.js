import PostcodeLookup from '.';
import { render, fireEvent } from '@testing-library/svelte';

describe('<PostcodeLookup />', () => {
  let getClient;

  let getPostcode;

  beforeEach(() => {
    getPostcode = jest.fn(() => ({ listAddresses: () => [] }));
    getClient = jest.fn(() => ({ getPostcode }));
  });

  it('fetches data from the client', () => {
    const testValue = 'testing';
    const { container } = render(PostcodeLookup, { getClient });
    const text = container.querySelector('input[type=text]');
    const button = container.querySelector('button');
    text.value = testValue;
    fireEvent.input(text);
    fireEvent.click(button);
    expect(getPostcode).toHaveBeenCalledTimes(1);
    expect(getPostcode).toHaveBeenCalledWith(testValue);
  });
});