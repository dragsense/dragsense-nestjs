import { Injectable } from '@angular/core';
import { API } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Project } from './projects/interfaces/project.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { RouteService } from '../routes.service';

@Injectable()
export class AdminService {
  private projectSubject = new BehaviorSubject<Project | null>(null);
  project$ = this.projectSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private routeService: RouteService,
  ) {}

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

  getProjectApiUrl(): string {
    const project = this.projectSubject.getValue();
    if (project)
      return `${project.domain}/${project.apiPrefix}/${project.apiVersion}`;

    return '';
  }

  signOut(): void {
    const authPath = this.routeService.getAuthPath();
    this.router.navigate([`${authPath}`]);
  }

  private getProject(id: number): Observable<any> {
    return this.http.get(`${API.projects.list}/${id}`);
  }

 
}
