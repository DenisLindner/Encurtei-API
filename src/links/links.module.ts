import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { UrlRepository } from './repository/url.repository';

@Module({
  controllers: [LinksController],
  providers: [LinksService, UrlRepository],
})
export class LinksModule {}
