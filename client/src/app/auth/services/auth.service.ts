import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../../assets/api';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: User): Observable<any> {
    return this.http.post(`${api.users.register}`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${api.auth.login}`, data);
  }

  forgot(data: { email: string }): Observable<any> {
    return this.http.post(`${api.auth.forgot}`, data);
  }

  reset(data: { password: string }): Observable<any> {
    return this.http.post(`${api.auth.reset}`, data);
  }
}
