import { Injectable } from '@angular/core';
import { API } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Project } from './projects/interfaces/project.interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AdminService {
  private projectSubject = new BehaviorSubject<Project | null>(null);
  project$ = this.projectSubject.asObservable();

  constructor(private http: HttpClient) {}

  onSelectProject(project: any, callback: () => void): void {
    if (project) {
      this.projectSubject.next(project);
      callback();
    }

    /* this.getProject(id).subscribe(
      (response) => {},
      (error) => {},
    ); */
  }

  getCurrentProject(): Project | null {
    return this.projectSubject.getValue();
  }

  private getProject(id: number): Observable<any> {
    return this.http.get(`${API.projects.list}/${id}`);
  }

  /* private signOut(): Observable<any> {
    
  } */
}
