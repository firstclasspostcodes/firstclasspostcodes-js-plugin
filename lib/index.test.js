import '.';

describe('window object injection', () => {
  it('is injected into the window object', () => {
    const { FirstclasspostcodesPlugin } = window;
    expect(FirstclasspostcodesPlugin).toEqual(expect.any(Function));
  });
});
