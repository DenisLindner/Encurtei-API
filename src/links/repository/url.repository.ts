import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CassandraService } from 'src/cassandra/cassandra.service';

const tresAnos = 94608000;

@Injectable()
export class UrlRepository {
  constructor(private readonly cassandraService: CassandraService) {}

  async saveUrl(shortCode: string, originalLink: string) {
    const query =
      'INSERT INTO urls (short_code, long_url, created_at) VALUES (?,?,?) IF NOT EXISTS USING TTL ?';

    const params = [shortCode, originalLink, new Date(), tresAnos];

    try {
      await this.cassandraService.client.execute(query, params, {
        prepare: true,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erro ao salvar url');
    }
  }

  async findShortCode(shortCode: string) {
    const query = 'SELECT long_url FROM urls WHERE short_code = ?';

    const params = [shortCode];

    try {
      const result = await this.cassandraService.client.execute(query, params, {
        prepare: true,
      });

      if (result.rowLength > 0) {
        return result.first().long_url as string;
      }

      return null;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erro ao buscar url');
    }
  }
}
