import { render, fireEvent } from '@testing-library/svelte';

import '.';

const targetSetup = () => {
  const div = document.createElement('div');
  div.id = 'root';
  div.dataset.testid = 'root';
  return div;
};

let container;

beforeEach(() => {
  container = targetSetup();
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

describe('window object injection', () => {
  it('is injected into the window object', () => {
    const { FirstclasspostcodesPlugin } = window;
    expect(FirstclasspostcodesPlugin).toEqual(expect.any(Function));
  });
});

describe('plugin instantiation', () => {
  let component;

  it('correctly renders the form', () => {
    const inputContainerClassName = 'test-input-container';

    component = window.FirstclasspostcodesPlugin(container, {
      apiKey: '111111111111',
      style: {
        classNames: {
          input: {
            container: inputContainerClassName,
          }
        }
      }
    });

    expect(container).not.toBeEmpty();
  });

  afterEach(() => {
    component.$destroy();
  });
});
