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

@Module({
  imports: [AuthModule, UsersModule, TenantsModule],
  controllers: [AppController, UsersController, TenantsController],
  providers: [AppService, PrismaService, UsersService, TenantsService],
})
export class AppModule { }
