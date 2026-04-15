import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client } from 'cassandra-driver';

@Injectable()
export class CassandraService implements OnModuleInit, OnModuleDestroy {
  client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: [process.env.CASSANDRA_CONTACT_POINTS ?? 'localhost'],
      localDataCenter: process.env.CASSANDRA_LOCAL_DATA_CENTER ?? 'datacenter1',
      keyspace: process.env.CASSANDRA_KEYSPACE ?? 'encurtador',
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.shutdown();
  }
}
