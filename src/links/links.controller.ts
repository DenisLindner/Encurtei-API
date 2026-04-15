import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDTO } from './dto/create-link.dto';
import type { Request } from 'express';

@Controller()
export class LinksController {
  constructor(private readonly service: LinksService) {}

  @Post()
  async createLink(@Body() dto: CreateLinkDTO, @Req() req: Request) {
    const shortCode = await this.service.create(dto);
    const url = `${req.protocol}://${req.get('host')}/${shortCode}`;
    return url;
  }

  @Get(':code')
  @Redirect()
  async getOriginalLink(@Param('code') shortCode: string) {
    return {
      url: await this.service.findOriginalLink(shortCode),
      statusCode: 302,
    };
  }
}
