import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { AuthGuard } from './auth.guard';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
    AuthComponent,
    SignupFormComponent,
    LogoutPageComponent,
    SignupPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService,

  ],
  exports: [
    LoginFormComponent,
    LoginPageComponent
  ]
})
export class AuthModule { }
