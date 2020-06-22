import { PrimaryColumn } from 'typeorm';
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
}
