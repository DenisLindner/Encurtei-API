import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { RedisModule } from './redis/redis.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    LinksModule,
    CassandraModule,
    RedisModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
