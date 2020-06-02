import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from './app/user/user.module';
import UserGroupModule from './app/user-group/user-group.module';
import { GraphQLSchema } from 'graphql';

@Module({
  imports: [
    UserModule,
    UserGroupModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: `${__dirname}/schema.gql`,
      transformSchema: (schema: GraphQLSchema) => {
        console.log('Transform-Schema');
        return schema;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
