import { Base64String, unBase64, base64 } from './base64';

const PREFIX = 'connection:';

export function offsetToCursor(offset: number): Base64String {
  return base64(PREFIX + offset);
}

export function cursorToOffset(cursor: Base64String): number {
  return parseInt(unBase64(cursor).substring(PREFIX.length), 10);
}
