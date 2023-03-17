import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (this.userService.token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
