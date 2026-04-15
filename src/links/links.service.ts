import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDTO } from './dto/create-link.dto';
import Redis from 'ioredis';
import { UrlRepository } from './repository/url.repository';

const CHARSET =
  '6plCWYq0iuerzvwEDQ5yGS7LJ2QA3VIXbfHP8RgaNmcd4knhoMxBj9st1TUZFO ';

@Injectable()
export class LinksService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly urlRepository: UrlRepository,
  ) {}

  async create(dto: CreateLinkDTO): Promise<string> {
    const id = await this.redis.incr('url_id_counter');

    const shortCode = this.generateShortCode(id);

    await this.urlRepository.saveUrl(shortCode, dto.originalUrl);

    return shortCode;
  }

  async findOriginalLink(shortCode: string) {
    const original = await this.urlRepository.findShortCode(shortCode);

    if (!original) {
      throw new NotFoundException('Link não encontrado');
    }

    return original;
  }

  private generateShortCode(id: number | bigint): string {
    let n = BigInt(id);
    if (n === 0n) {
      return CHARSET[0];
    }

    let shortCode = '';
    while (n > 0n) {
      shortCode = CHARSET[Number(n % 62n)] + shortCode;
      n = n / 62n;
    }

    return shortCode;
  }
}
