import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './interfaces/user.interface';
import { API } from '../config/api.config';
import { AuthResponse } from './interfaces/auth.interface';
import { AppService } from '@app/app.service';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {}

  register(data: any): Observable<any> {
    return this.http.post(`${API.users.register}`, data);
  }

  auth(data: { email: string; password: string }): Observable<any> {
    return this.http.post<AuthResponse>(`${API.auth.login}`, data).pipe(
      tap((response) => {

        if (response) {
          this.appService.login();
        }
      }),
    );
  }

  forgot(data: { email: string }): Observable<any> {
    return this.http.post(`${API.auth.forgot}`, data);
  }

  reset(data: { password: string; token: string }): Observable<any> {
    return this.http.post(`${API.auth.reset}`, data);
  }

  resendVerificationEmail(data: { email: string }): Observable<any> {
    return this.http.post(`${API.auth.resend}`, data);
  }
}
