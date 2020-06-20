import { PaginationInput, paginationDefaults } from './input-type';
import { Args } from '@nestjs/graphql';

export function PaginationArgs(defaults?: PaginationInput): ParameterDecorator {
  return Args('paginationInput', {
    defaultValue: { ...paginationDefaults, ...defaults },
    type: () => PaginationInput,
  });
}
