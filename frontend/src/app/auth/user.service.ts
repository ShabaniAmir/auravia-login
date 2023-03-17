import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem('token');

  constructor(private readonly httpClient: HttpClient) { }

  async login(email: string, password: string) {
    const response = await this.httpClient.post<{
      token: string;
    }>("/auth/login", {
      email,
      password
    })

    response.subscribe(response => {
      localStorage.setItem('token', response.token);
    });

    return response;
  }

  async register(email: string, password: string) {
    const response = await this.httpClient.post<
      {
        user: {
          id: number,
          email: string,
        },
        token: string,
      }>("/users", {
        email,
        password
      })

    response.subscribe(response => {
      localStorage.setItem('token', response.token);
    });

    return response;
  }
}
