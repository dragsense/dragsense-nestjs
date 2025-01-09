import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { User } from './auth/interfaces/user.interface';
import { API } from '@config/api.config';
import { AppThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readySubject = new BehaviorSubject<
    'logged-out' | 'logged-in' | 'pending'
  >('pending');
  private userSubject = new BehaviorSubject<User | null>(null);

  ready$ = this.readySubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly themeService: AppThemeService,
  ) {}

  initializeApp(): Observable<any> {
    this.fetchUserData().then((response) => {
      if (response?.user) {
        this.userSubject.next(response.user);
        this.themeService.setThemeMode(response.profile?.themeMode);
        this.readySubject.next('logged-in');
      } else {
        this.userSubject.next(null);
        this.readySubject.next('logged-out');
      }
    });
    return this.ready$;
  }

  private async fetchUserData(): Promise<any> {
    try {
      const response = await this.http
        .get<User>(`${API.users.profile}`)
        .toPromise();
      return response;
    } catch (error) {
      return null;
    }
  }

  updateProfile(updatedProfile: any) {
    const user = this.userSubject.value;
    if (user) {
      user.email = updatedProfile.email;
      user.firstname = updatedProfile.firstname;
      user.lastname = updatedProfile.lastname;
    }

    this.themeService.setThemeMode(updatedProfile?.themeMode);
    this.userSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  getReadyState(): any {
    return this.readySubject.value;
  }

  login(): void {
    this.readySubject.next('pending');

    this.initializeApp();
  }

  logout(): void {
    this.readySubject.next('pending');

    this.http
      .post(`${API.auth.logout}`, {})
      .pipe(
        catchError((error) => {
          console.error('Logout failed', error);
          throw error;
        }),
        finalize(() => {
          this.userSubject.next(null);
          this.readySubject.next('logged-out');
        }),
      )
      .subscribe();
  }
}
