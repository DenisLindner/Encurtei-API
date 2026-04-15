import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [LinksModule, CassandraModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
