import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../config/api.config';
import { Observable } from 'rxjs';

@Injectable()
export class TeamsService {

  constructor(private http: HttpClient) {}
  
    getAll(): Observable<any> {
      return this.http.get(`${API.teams.list}`);
    }
  
    get(id: number): Observable<any> {
      return this.http.get(`${API.teams.list}/${id}`);
    }

    create(data: any): Observable<any> {
      return this.http.post(`${API.teams.create}`, data);
    }
  
    update(id: number, data: any): Observable<any> {
      return this.http.post(`${API.teams.update}/${id}`, data);
    }
  
    delete(id: number): Observable<any> {
      return this.http.delete(`${API.teams.delete}/${id}`);
    }
}
