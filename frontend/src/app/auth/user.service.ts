import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem('token');
  registerObservable: Observable<any> | null = null;
  loginObservable: Observable<any> | null = null;

  constructor(private readonly httpClient: HttpClient) { }

  async login(email: string, password: string) {
    if (this.loginObservable) {
      return this.loginObservable;
    }
    this.loginObservable = this.httpClient.post<{
      token: string;
    }>("/auth/login", {
      email,
      password
    })

    this.loginObservable.subscribe(response => {
      console.log({ response })
      localStorage.setItem('token', response.token);
    });

    return this.loginObservable;
  }

  async register(email: string, password: string) {
    if (this.registerObservable) {
      return this.registerObservable;
    }
    this.registerObservable = this.httpClient.post<
      {
        user: {
          id: number,
          email: string,
        },
        token: string,
      }>("/auth/register", {
        email,
        password
      })

    this.registerObservable.subscribe((response: {
      user: {
        id: number,
        email: string,
      },
      token: string
    }) => {
      localStorage.setItem('token', response.token);
    }
    );

    return this.registerObservable;
  }

  async logout() {
    localStorage.removeItem('token');
  }

}
