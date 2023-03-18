import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiKeysService } from 'src/api-keys/api-keys.service';
import { TenantsService } from 'src/tenants/tenants.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private apiKeyService: ApiKeysService, private tenantService: TenantsService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.validateUser(username, pass);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        const payload = {
            id: user.id,
            email: user.email,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async validateApiKey(apiKey: string) {
        const key = await this.apiKeyService.validateApiKey(apiKey);
        if (!key) {
            throw new UnauthorizedException();
        }
        return
    }
}