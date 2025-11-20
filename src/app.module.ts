import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StudentsModule } from './students/students.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from './common/filters/graphql-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
      context: ({ req }) => ({ req }),
      formatError: (error) => {
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          statusCode: error.extensions?.statusCode || 500,
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      database: process.env.DB_NAME || 'your_database',
      password: process.env.DB_PASSWORD || 'your_password',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    StudentsModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class AppModule {}
