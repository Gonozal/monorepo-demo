import {
  paginationInputToSQLOffset,
  recordsToConnection,
} from './helper.typeorm';
import { PaginationInput } from './input-type';
import { offsetToCursor } from '../utils/cursor';

// 53
const cursor = 'Y29ubmVjdGlvbjo1Mw=='; // 53
const lowCursor = 'Y29ubmVjdGlvbjoz'; // 3

describe('typeorm-helper', () => {
  const records: Array<{ name: string }> = [
    { name: '1st' },
    { name: '2nd' },
    { name: '3rd' },
    { name: '4th' },
    { name: '5th' },
    { name: '6th' },
    { name: '6th' },
    { name: '8th' },
    { name: '9th' },
    { name: '10th' },
    { name: '11th' },
    { name: '12th' },
  ];
  describe('paginationInputToSQLOffset', () => {
    describe('incorrect usage', () => {
      it('throws if no pagination arguments are passed', () => {
        expect(() =>
          paginationInputToSQLOffset(new PaginationInput())
        ).toThrowError();
      });

      it('throws if only partial forward pagination arguments are passed (after)', () => {
        const paginationInput = new PaginationInput();
        paginationInput.after = cursor;
        expect(() =>
          paginationInputToSQLOffset(paginationInput)
        ).toThrowError();
      });

      it('throws if only partial backwards pagination arguments are passed (first)', () => {
        const paginationInput = new PaginationInput();
        paginationInput.last = 5;
        expect(() =>
          paginationInputToSQLOffset(paginationInput)
        ).toThrowError();
      });

      it('throws if only partial forward pagination arguments are passed (after)', () => {
        const paginationInput = new PaginationInput();
        paginationInput.before = cursor;
        expect(() =>
          paginationInputToSQLOffset(paginationInput)
        ).toThrowError();
      });

      it('throws if both forward and backward pagination arguments are passed (before & after)', () => {
        const paginationInput = new PaginationInput();
        paginationInput.before = cursor;
        paginationInput.after = cursor;
        expect(() =>
          paginationInputToSQLOffset(paginationInput)
        ).toThrowError();
      });

      it('throws if both forward and backward pagination arguments are passed (first & last)', () => {
        const paginationInput = new PaginationInput();
        paginationInput.first = 5;
        paginationInput.last = 5;
        expect(() =>
          paginationInputToSQLOffset(paginationInput)
        ).toThrowError();
      });
    });

    describe('correct usage', () => {
      it('correctly returns forward pagination arguments', () => {
        const paginationInput = new PaginationInput();
        paginationInput.first = 5;
        paginationInput.after = cursor;
        expect(paginationInputToSQLOffset(paginationInput)).toEqual({
          take: 5,
          skip: 53,
        });
      });

      it('correctly returns backwards pagination arguments', () => {
        const paginationInput = new PaginationInput();
        paginationInput.last = 5;
        paginationInput.before = cursor;
        expect(paginationInputToSQLOffset(paginationInput)).toEqual({
          take: 5,
          skip: 47,
        });
      });

      it('correctly returns backwards pagination arguments and does not overshoot 0', () => {
        const paginationInput = new PaginationInput();
        paginationInput.last = 5;
        paginationInput.before = lowCursor;
        expect(paginationInputToSQLOffset(paginationInput)).toEqual({
          take: 2,
          skip: 0,
        });
      });

      it('correctly returns forward pagination arguments when only passing first', () => {
        const paginationInput = new PaginationInput();
        paginationInput.first = 5;
        expect(paginationInputToSQLOffset(paginationInput)).toEqual({
          take: 5,
          skip: 0,
        });
      });
    });
  });

  describe('recordsToConnection', () => {
    it('returns the total record count unaltered', () => {
      expect(
        recordsToConnection(records, 12, { take: 12, skip: 0 }).totalCount
      ).toBe(12);
    });

    it('returns the correct start-curser when starting at zero', () => {
      expect(
        recordsToConnection(records, 12, { take: 12, skip: 0 }).pageInfo
          .startCursor
      ).toBe(offsetToCursor(1));
    });

    it('returns the correct end-curser when starting at zero', () => {
      expect(
        recordsToConnection(records, 12, { take: 12, skip: 0 }).pageInfo
          .endCursor
      ).toBe(offsetToCursor(12));
    });
  });
});
