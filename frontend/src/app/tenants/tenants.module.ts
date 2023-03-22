import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantsService } from './tenants.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TenantFormComponent } from './tenant-form/tenant-form.component';



@NgModule({
  declarations: [

    TenantFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TenantsService
  ],
  exports: [
  ]
})
export class TenantsModule { }
