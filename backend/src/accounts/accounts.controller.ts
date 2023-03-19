import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Get, Post, Request, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/api-key.guard';
import { UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { SecretKeyGuard } from 'src/auth/secret-key.guard';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAccounts(@Request() req) {
        return new HttpException('', HttpStatus.METHOD_NOT_ALLOWED)
        return this.accountsService.getAccounts(req.tenant.id)
    }

    @UseGuards(ApiKeyGuard)
    @Post()
    async createAccount(@Request() req, @Body("credential") credential: string, @Body("password") password: string) {
        return this.accountsService.createAccount(req.tenant.id, {
            credential,
            password
        })
    }

    @UseGuards(ApiKeyGuard)
    @HttpCode(200)
    @Post('login')
    async login(@Request() req, @Body("credential") credential, @Body("password") password) {
        return this.accountsService.generateToken(req.tenant, credential, password)
    }

    @UseGuards(SecretKeyGuard)
    @Post('verify')
    @HttpCode(200)
    async verify(@Request() req, @Body("token") token) {
        return this.accountsService.verifyToken(req.tenant, token)
    }


}
