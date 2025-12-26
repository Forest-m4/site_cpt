import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Module } from '@nestjs/common';
import * as schema from '../src/lib/infrastructure/db/schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzlePGModule.registerAsync({
      tag: 'DB_DEV',
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory(config: ConfigService) {
        return {
          pg: {
            connection: 'pool',
            config: {
              connectionString: config.getOrThrow<string>('DATABASE_URL'),
            },
          },
          config: { schema: { ...schema } },
        };
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
