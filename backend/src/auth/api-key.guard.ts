import { ApiKeysService } from 'src/api-keys/api-keys.service';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantsService } from 'src/tenants/tenants.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(private readonly apiKeysService: ApiKeysService, private readonly tenantService: TenantsService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log({ apiKey })
    if (apiKey) {
      const validatedApiKey = await this.apiKeysService.validateApiKey(apiKey);
      if (validatedApiKey) {
        const tenant = await this.tenantService.getTenant(validatedApiKey.tenantId);
        request.tenant = tenant;
        return true;
      }

    }

    throw new HttpException('Invalid API key', HttpStatus.UNAUTHORIZED);
    return false;
  }
}
