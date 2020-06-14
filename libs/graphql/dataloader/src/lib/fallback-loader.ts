import DataLoader from 'dataloader';
import { getRepository, Repository } from 'typeorm';

import { SimplifiedFindOptions } from './../types/query-options';
import { GraphQLDataLoader } from './dataloader';

class FallbackDataLoader<T> extends GraphQLDataLoader<T> {
  constructor(primaryRepository: Repository<T>) {
    super();
    this.primaryRepository = primaryRepository;
  }
}

export function getDataLoader<T>(
  context: any,
  type: (new () => T) & { name: string }
): DataLoader<SimplifiedFindOptions<T>, T[], string> {
  const contextKey = `${type.name}Loader`;
  if (context[contextKey]) {
    return context[contextKey];
  }
  const userGroupRepository = getRepository<T>(type);
  const userGroupLoader = new FallbackDataLoader(userGroupRepository);
  const dataLoader = userGroupLoader.generateDataLoader();

  context[contextKey] = dataLoader;
  return dataLoader;
}
