import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule } from '@angular/router';
import { TenantsModule } from '../tenants/tenants.module';
import { TenantsService } from '../tenants/tenants.service';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TenantsModule
  ],
  providers: [
    TenantsService
  ],
  exports: [
    DashboardComponent
  ],
})
export class DashboardModule { }
