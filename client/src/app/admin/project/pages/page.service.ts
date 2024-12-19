import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin.service';

@Injectable()
export class PageService {
  serverUrl!: string;

  constructor(
    private http: HttpClient,
    private adminService: AdminService,
  ) {
    this.serverUrl = this.adminService.getProjectApiUrl();
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}/'pages'}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.serverUrl}/'pages/${id}`);
  }
}
