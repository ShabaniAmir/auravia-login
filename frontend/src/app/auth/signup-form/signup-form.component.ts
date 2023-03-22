import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  email = '';
  password = '';

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.userService.token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  async signup() {
    await (await this.userService.register(this.email, this.password)).subscribe(response => {
      if (response.token) {
        this.userService.login(this.email, this.password)
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

}
