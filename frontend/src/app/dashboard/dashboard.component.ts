import { Component, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private tenantsService: TenantsService) { }

  ngOnInit() {
    this.getTenants()
  }

  async getTenants() {
    const tenants = await this.tenantsService.getTenants()
    tenants.subscribe(tenants => {

      console.log({ tenants })
    })
  }

}
