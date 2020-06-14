import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { SimplifiedFindOptions } from '../types/query-options';
import { Repository, In } from 'typeorm';

class GraphQLDataLoaderError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export abstract class GraphQLDataLoader<T>
  implements NestDataLoader<SimplifiedFindOptions<T>, T[]> {
  public primaryRepository!: Repository<T>;

  private transformMergedConditions(result: Record<string, any>) {
    const transformed: Record<string, { where: Record<string, any> }> = {};
    Object.keys(result).forEach((resultKey) => {
      transformed[resultKey] = {
        where: { [resultKey]: In(result[resultKey]) },
      };
    });
    return transformed;
  }

  private assertSingularCondition(conditionKeys: any[]): void {
    if (conditionKeys.length > 1) {
      throw new GraphQLDataLoaderError(
        'NestJS-Dataloader does not support where-conditions with multiple conditions'
      );
    }
  }

  private assertNoArrayCondition<K>(conditionValue: K | K[]): void {
    if (Array.isArray(conditionValue))
      throw new GraphQLDataLoaderError(
        'NestJS-Dataloader does not support Arrays in where-conditions'
      );
  }

  protected mergeFindOptions(keys: readonly SimplifiedFindOptions<T>[]) {
    const result: Record<string, any> = {};
    keys.forEach((key) => {
      const conditions = key.where;
      const conditionKeys = Object.keys(conditions);
      this.assertSingularCondition(conditionKeys);

      conditionKeys.forEach((conditionKey) => {
        const conditionValue = conditions[conditionKey as keyof T];
        this.assertNoArrayCondition(conditionValue);
        if (result[conditionKey]) {
          result[conditionKey].push(conditionValue);
        } else {
          result[conditionKey] = [conditionValue];
        }
      });
    });

    return this.transformMergedConditions(result);
  }

  protected cacheKeyFunction(key: SimplifiedFindOptions<T>): string {
    const whereObj = key.where;
    const whereObjKey = Object.keys(whereObj)[0];
    if (!whereObj) return '';
    return `${whereObjKey}-${whereObj[whereObjKey as keyof T]}`;
  }

  protected async queryBatches(
    batches: Record<string, { where: Record<string, any> }>
  ) {
    const results: Record<string, Record<string, T[]>> = {};
    const keys = Object.keys(batches);
    await Promise.all(
      keys.map(async (key) => {
        const condition = batches[key];
        const records = await this.primaryRepository.find(condition);
        results[key] = records.reduce((res: Record<string, T[]>, obj: T) => {
          const keyAttr = `${obj[key as keyof T]}`;
          const existingValue = res[keyAttr];
          if (existingValue) {
            existingValue.push(obj);
          } else {
            res[keyAttr] = [obj];
          }
          return res;
        }, {});
        return records;
      })
    );
    return results;
  }

  protected mapKeysToBatches(
    keys: readonly SimplifiedFindOptions<T>[],
    results: Record<string, Record<string, T[]>>
  ): Array<T[] | Error> {
    return keys.map((key) => {
      const queryKey = Object.keys(key.where)[0];
      const batch = results[queryKey];
      if (!batch) return new Error('No record found');
      const queryValue = `${key.where[queryKey as keyof T]}`;
      return batch[queryValue];
    });
  }

  generateDataLoader(): DataLoader<SimplifiedFindOptions<T>, T[], string> {
    return new DataLoader<SimplifiedFindOptions<T>, T[], string>(
      async (keys) => {
        const batches = this.mergeFindOptions(keys);
        const results = await this.queryBatches(batches);
        return this.mapKeysToBatches(keys, results);
      },
      { cacheKeyFn: this.cacheKeyFunction }
    );
  }
}
