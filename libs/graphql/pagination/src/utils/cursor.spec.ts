import { offsetToCursor, cursorToOffset } from './cursor';

describe('cursor', () => {
  describe('encoding', () => {
    it('encodes the number 12 correctly', () => {
      expect(offsetToCursor(12)).toBe('Y29ubmVjdGlvbjoxMg==');
    });

    it('encodes the number 120 correctly', () => {
      expect(offsetToCursor(120)).toBe('Y29ubmVjdGlvbjoxMjA=');
    });
  });

  describe('decoding', () => {
    it('decodes the curser 53 correctly', () => {
      expect(cursorToOffset('Y29ubmVjdGlvbjo1Mw==')).toBe(53);
    });

    it('decodes the curser 79 correctly', () => {
      expect(cursorToOffset('Y29ubmVjdGlvbjo3OQ==')).toBe(79);
    });
  });
});
