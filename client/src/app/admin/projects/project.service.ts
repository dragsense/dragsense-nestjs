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


  getLastKeys = (obj: any, result: Record<string, any> = {}): any => {
    for (const key in obj) {
      if (
        obj[key] &&
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key])
      ) {
        if (
          key.toLowerCase().includes('date') &&
          obj[key].hasOwnProperty('year')
        ) {
          const { year, month, day, hour, minute, second } = obj[key];
          const date = new Date(year, month - 1, day, hour, minute, second);
          result[key] = date;
        } else {
          this.getLastKeys(obj[key], result);
        }
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  };
}
