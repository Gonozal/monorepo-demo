import * as crypto from 'crypto';
import { base64, unBase64 } from './base64';

describe('base64', () => {
  describe('encoding', () => {
    it('encodes a simple string correctly', () => {
      expect(base64('connection')).toBe('Y29ubmVjdGlvbg==');
    });
  });

  describe('decoding', () => {
    it('decodes a simple base64-string correctly', () => {
      expect(unBase64('SGVsbG8gV29ybGQh')).toBe('Hello World!');
    });
  });

  describe('round-trip', () => {
    it('correctly encodes and then decodes a string back to the original value', () => {
      const str = crypto.randomBytes(20).toString('base64');

      expect(unBase64(base64(str))).toBe(str);
    });
  });
});
