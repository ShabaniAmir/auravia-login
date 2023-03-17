import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';

@Module({
  providers: [ApiKeysService, PrismaService],
  controllers: [ApiKeysController],
  exports: [ApiKeysService]
})
export class ApiKeysModule { }
