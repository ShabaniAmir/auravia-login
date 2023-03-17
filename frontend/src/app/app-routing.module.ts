import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    path: 'auth',
    // page is lazy loaded login-page-component from auth module
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'login',
    redirectTo: 'auth/login',
  },
  {
    path: 'signup',
    redirectTo: 'auth/signup',
  },
  {
    path: 'logout',
    redirectTo: 'auth/logout',
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
