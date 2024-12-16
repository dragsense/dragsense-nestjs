import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${API.projects.list}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${API.projects.list}/${id}`);
  }
}
