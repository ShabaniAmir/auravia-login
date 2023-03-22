import { Component } from '@angular/core';
import { TenantsService } from '../tenants.service';
@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent {
  constructor(private tenantsService: TenantsService) { }

  createTenant() {
    this.tenantsService.createTenant()
  }
}
