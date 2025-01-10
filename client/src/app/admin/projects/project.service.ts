import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../config/api.config';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${API.projects.list}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${API.projects.list}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API.projects.create}`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.post(`${API.projects.update}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API.projects.delete}/${id}`);
  }


}
