import { Injectable } from '@angular/core';
import { API } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { PlatformType, Project } from './projects/interfaces/project.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { RouteService } from '../routes.service';
import { AppService } from '@app/app.service';

@Injectable()
export class AdminService {
  private sidebarState = new BehaviorSubject<boolean>(true);
  sidebarState$ = this.sidebarState.asObservable();

  private projectSubject = new BehaviorSubject<Project | null>(null);
  project$ = this.projectSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private routeService: RouteService,
    private appSerivce: AppService,
  ) {
    this.projectSubject.next({
      id: 1,
      identifier: 'project1',
      name: 'My Project 1',
      serverUrl: 'https://domain.com',
      apiVer: 'v1',
      apiPrefix: 'api',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui dolores vel quod necessitatibus laborum optio. Deleniti tenetur, odio consectetur amet reiciendis dolorem sunt, sint consequatur, voluptate quod inventore eos perspiciatis?',
      platform: PlatformType.NodeJS,
      apiKey: 'aasas',
      connected: true,
    });
  }

  setSidebarState() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  getSidebarState(): boolean {
    return this.sidebarState.value;
  }

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
      return `${project.serverUrl}/${project.apiPrefix}/${project.apiVer}`;

    return '';
  }

  signOut(): void {
    this.appSerivce.logout();
    const authPath = this.routeService.getAuthPath();
    this.router.navigate([`${authPath}`]);
  }

  private getProject(id: number): Observable<any> {
    return this.http.get(`${API.projects.list}/${id}`);
  }

  sendVerificationEmail(): Observable<any> {
    return this.http.post(`${API.auth.resend}`, {});
  }
}
