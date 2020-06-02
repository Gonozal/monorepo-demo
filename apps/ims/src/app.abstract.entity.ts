import { PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { v4 as uuidV4 } from 'uuid';

@ObjectType({ isAbstract: true })
export default abstract class AppEntity {
  @PrimaryColumn('uuid')
  @Field(() => ID)
  id: string = uuidV4();
}
