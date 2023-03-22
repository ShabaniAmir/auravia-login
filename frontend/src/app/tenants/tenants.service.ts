import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tenant } from '@backend/node_modules/prisma/prisma-client'


@Injectable({
  providedIn: 'root'
})
export class TenantsService implements OnInit {

  tenants: Tenant[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {

  }

  async getTenants() {
    const tenantsRequest = this.http.get<Tenant[]>('/tenants')
    tenantsRequest.subscribe(tenants => {
      this.tenants = tenants
      console.log({ tenants })
    })

    return tenantsRequest
  }

  async createTenant() {
    const tenantRequest = this.http.post<Tenant>('/tenants', {})
    tenantRequest.subscribe(tenant => {
      this.tenants.push(tenant)
      console.log({ tenant })
    })

    return tenantRequest
  }
}
