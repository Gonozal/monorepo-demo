import { FilterableField } from '@nestjs-query/query-graphql';
import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { v4 as uuidV4 } from 'uuid';

@ObjectType({ isAbstract: true })
export abstract class AppEntity {
  static generateId(): string {
    return uuidV4();
  }

  @PrimaryColumn('uuid')
  @Field(() => ID)
  id: string = uuidV4();

  @FilterableField(() => Date)
  @CreateDateColumn()
  public createdAt!: Date;

  @FilterableField(() => Date)
  @UpdateDateColumn()
  public updatedAt!: Date;
}
