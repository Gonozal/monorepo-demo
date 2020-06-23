import { registerEnumType } from '@nestjs/graphql';

export enum ScenarioCategoryType {
  CATEGORY = 'CATEGORY',
  CATEGORY_GROUP = 'CATEGORY_GROUP',
}

registerEnumType(ScenarioCategoryType, {
  name: 'ScenarioCategoryType', // this one is mandatory
  description: 'Category Type (category or categoryGroup)', // this one is optional
});
