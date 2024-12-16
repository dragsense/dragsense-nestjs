import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { PlatformType, Project } from './interfaces/project.interface';
import { LayoutComponent } from '../layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from '../layout/table/table.component';
import { PaginatorComponent } from '../layout/paginator/paginator.component';
import { RouteService } from '../../routes.service';
import { Router, RouterLink } from '@angular/router';
import { Action, Column } from '../layout/table/interfaces/table.interface';
import { ProjectRouteType } from '../../config/routes.config';

@Component({
  selector: 'app-projects',
  imports: [
    ButtonModule,
    RouterLink,
    LayoutComponent,
    TableComponent,
    PaginatorComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  providers: [ProjectService],
})
export class ProjectsComponent implements OnInit {
  projects!: Partial<Project>[];
  projectPath!: string;

  columns!: Column[];
  actions!: Action[];

  constructor(
    private projectService: ProjectService,
    private routeService: RouteService,
    private router: Router,
  ) {
    this.columns = [
      { field: 'id', header: 'Id' },
      { field: 'identifier', header: 'Identifier' },
      { field: 'name', header: 'Name' },
      { field: 'platform', header: 'Platform' },
    ];
  }

  ngOnInit() {
    this.projectPath = this.routeService.getProjectsPath(
      ProjectRouteType.Single,
    );

    console.log(this.projectPath);

    this.actions = [
      {
        button: {
          icon: 'pi pi-pencil',
          severity: 'secondary',
          size: 'small',
        },
        callback: (row: any) => this.onEditProject(row),
      },
      {
        button: {
          icon: 'pi pi-trash',
          severity: 'danger',
          size: 'small',
          text: true,
        },
        callback: (row: any) => this.onDeleteProject(row),
      },
    ];

    this.projects = [
      {
        id: 0,
        identifier: 'project1',
        name: 'My Project 2',
        platform: PlatformType.NodeJS,
      },
      {
        id: 1,
        identifier: 'project2',
        name: 'My Project 1',
        platform: PlatformType.Laravel,
      },
      {
        id: 2,
        identifier: 'project2',
        name: 'My Project 2',
        platform: PlatformType.NodeJS,
      },
    ];

    this.projectService.getAll().subscribe(
      (response) => {},
      (error) => {},
    );
  }

  onEditProject(project: Project) {
    this.router.navigate([`${this.projectPath}`, { id: project.id }]);
  }

  onDeleteProject(project: Project) {}
}
