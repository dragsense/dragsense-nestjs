import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { API } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: User): Observable<any> {
    return this.http.post(`${API.users.register}`, data);
  }

  auth(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${API.auth.login}`, data);
  }

  forgot(data: { email: string }): Observable<any> {
    return this.http.post(`${API.auth.forgot}`, data);
  }

  reset(data: { password: string }): Observable<any> {
    return this.http.post(`${API.auth.reset}`, data);
  }
}
