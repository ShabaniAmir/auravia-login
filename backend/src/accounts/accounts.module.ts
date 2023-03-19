import { ApiKeysModule } from './../api-keys/api-keys.module';
import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { PrismaService } from 'src/prisma.service';
import { TenantsModule } from 'src/tenants/tenants.module';
import { TenantsService } from 'src/tenants/tenants.service';
import { ApiKeysService } from 'src/api-keys/api-keys.service';

@Module({
  imports: [
    TenantsModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService, ApiKeysService, TenantsService]
})
export class AccountsModule { }
