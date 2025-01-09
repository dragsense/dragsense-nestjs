import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${API.users.profile}`);
  }

  saveProfile(data: any): Observable<any> {
    return this.http.post(`${API.users.profile}`, data);
  }

}
