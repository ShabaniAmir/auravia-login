import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TenantsModule } from './tenants/tenants.module';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { ApiKeysController } from './api-keys/api-keys.controller';
import { ApiKeysService } from './api-keys/api-keys.service';

@Module({
  imports: [AuthModule, UsersModule, TenantsModule, ApiKeysModule],
  controllers: [AppController, UsersController, TenantsController, ApiKeysController],
  providers: [AppService, PrismaService, UsersService, TenantsService, ApiKeysService],
})
export class AppModule { }
