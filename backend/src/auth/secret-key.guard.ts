import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantsService } from 'src/tenants/tenants.service';
import { ApiKeysService } from 'src/api-keys/api-keys.service';

@Injectable()
export class SecretKeyGuard implements CanActivate {

  constructor(
    private readonly apiKeysService: ApiKeysService,
    private readonly tenantService: TenantsService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const secretKey = request.headers['x-api-key'].split('sk-')[1];

    if (secretKey) {
      const validatedApiKey = await this.apiKeysService.validateApiKeySecret(secretKey);
      if (validatedApiKey) {
        const tenant = await this.tenantService.getTenant(validatedApiKey.tenantId);
        request.tenant = tenant;
        return true;
      }
    }
    throw new HttpException('Invalid API key', HttpStatus.UNAUTHORIZED);
  }
}
