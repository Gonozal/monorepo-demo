import { gqlContext } from './common/context';
import { AuthDirective } from '@monorepo/graphql/authentication-directive';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { UserGroupModule } from './app/user-group/user-group.module';

@Module({
  imports: [
    UserModule,
    UserGroupModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: `${__dirname}/schema.gql`,
      tracing: true,
      schemaDirectives: {
        Authorized: AuthDirective,
      },
      context: gqlContext,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      logging: ['query'],
      cache: {
        type: 'redis',
        duration: 250,
        options: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT as string, 10),
          password: process.env.REDIS_PASSWORD,
        },
      },
    }),
  ],
})
export class AppModule {}
