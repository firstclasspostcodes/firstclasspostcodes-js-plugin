import { getClient } from './client';

beforeEach(() => {
  window.Firstclasspostcodes = null;
});

describe('#getClient', () => {
  describe('when Firstclasspostcodes() is not set', () => {
    it('throws an error', () => {
      expect(() => getClient()).toThrow(Error);
    });
  });

  describe('when Firstclasspostcodes is set', () => {
    const key = 'abcdetyhgfre4';

    const overrides = { endpoint: 'http://localhost:7878' };

    beforeEach(() => {
      window.Firstclasspostcodes = jest.fn(() => 12345);
    });

    it('creates a client', () => {
      expect(getClient(key, overrides)).toBe(12345);
      expect(window.Firstclasspostcodes).toHaveBeenCalledTimes(1);
      expect(window.Firstclasspostcodes).toHaveBeenCalledWith(key,  overrides);
    });
  });
});