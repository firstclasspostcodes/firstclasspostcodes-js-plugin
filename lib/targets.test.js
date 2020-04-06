import { getByTestId } from '@testing-library/dom';

import { assignValueToTarget, getTarget } from './targets';

const testSetup = () => {
  const div = document.createElement('div');
  div.dataset.testid = 'root';
  div.innerHTML = `
    <form data-testid="form">
      <input data-testid="input" name="name" id="name" />
    </form>
  `;
  return div;
};

let container;

beforeEach(() => {
  container = testSetup();
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

describe('#assignValueToTarget', () => {
  let value = 'testing';

  describe('when the target exists', () => {
    it('correctly assigns the value', () => {
      assignValueToTarget('#name', value);
      expect(getByTestId(container, 'form')).toHaveFormValues({
        name: value,
      });
    });
  });

  describe('when the target does not exist', () => {
    it('does not throw', () => {
      expect(() => assignValueToTarget('#does-not-exist', value)).not.toThrow();
    });
  })
});

describe('#getTarget', () => {
  it('retrieves the correct element', () => {
    expect(getTarget(null)).toBe(null);
    expect(getTarget('div')).toBe(container);
    expect(getTarget('#does-not-exist')).toBe(null);
    expect(getTarget('#name')).toEqual(getByTestId(container, 'input'));
  });
});