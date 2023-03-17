import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantDto } from 'src/dto/tenant.dto';

@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenantsService: TenantsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTenant(@Body() tenant: TenantDto, @Request() req) {
        return this.tenantsService.createTenant({
            ...tenant,
            Owner: {
                connect: {
                    id: req.user.id
                }
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTenants(@Request() req) {
        return this.tenantsService.getTenants({
            Owner: {
                id: req.user.id
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTenant(@Request() req, @Param('id') id: string) {
        return this.tenantsService.getTenant(id);
    }

}
