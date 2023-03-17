import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  email = '';
  password = '';

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  async login() {
    await (await this.userService.login(this.email, this.password)).subscribe((response: any) => {
      if (response.token) {
        console.log({ token: response.token })
        this.router.navigateByUrl('/dashboard');
      }
    });
  }


}
