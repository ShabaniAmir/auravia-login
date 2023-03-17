import { ApiKeyDto } from './../dto/apiKey.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';

@Controller('api-keys')
export class ApiKeysController {
    constructor(private readonly apiKeysService: ApiKeysService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createApiKey(@Request() req, @Body() body: ApiKeyDto) {
        return await this.apiKeysService.createApiKey({
            Tenant: {
                connect: {
                    id: body.tenantId
                }
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getApiKeys(@Request() req) {
        return await this.apiKeysService.getApiKeys({
            Tenant: {
                id: req.user.tenantId
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getApiKey(@Request() req, @Param('id') id: string) {
        return await this.apiKeysService.getApiKey(id);
    }
}
