import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';

@Module({
  imports: [
  ],
  providers: [TenantsService, PrismaService],
  controllers: [TenantsController]
})
export class TenantsModule { }
