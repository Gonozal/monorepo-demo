import { validate, ValidationError } from 'class-validator';
import { PaginationInput, paginationDefaults } from './input-type';

type Attributes<T> = { [A in keyof T]: T[A] };

function assignAttributes<T>(attributes: Attributes<T>, obj: T): T {
  Object.keys(attributes).forEach((e) => {
    const key = e as keyof T;
    obj[key] = attributes[key];
  });
  return obj;
}

describe('pagination input', () => {
  describe('incorrect usage', () => {
    it('rejects negative first values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, first: -2 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(1);
    });

    it('rejects non-integer first values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, first: 1.5 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(1);
    });

    it('rejects negative last values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, last: -2 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(1);
    });

    it('rejects non-integer last values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, last: 1.5 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(1);
    });
  });

  describe('correct usage', () => {
    it('accepts positive first values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, first: 10 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(0);
    });

    it('accepts 0 as first values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, first: 0 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(0);
    });

    it('accepts positive last values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, last: 10 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(0);
    });
    it('accepts 0 as last values', async () => {
      const input = new PaginationInput();
      assignAttributes({ ...paginationDefaults, last: 0 }, input);
      expect(
        validate(input, { skipMissingProperties: true })
      ).resolves.toHaveLength(0);
    });
  });
});
