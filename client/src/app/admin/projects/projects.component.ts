import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectService } from './project.service';
import { PlatformType } from './interfaces/project.interface';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from '../layout/table/table.component';
import { PaginatorComponent } from '../layout/paginator/paginator.component';
import { RouteService } from '../../routes.service';
import { Router, RouterLink } from '@angular/router';
import { Action, Column } from '../layout/table/interfaces/table.interface';
import { ProjectsRouteType } from '../../config/routes.config';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-projects',
  imports: [ButtonModule, RouterLink, TableComponent, PaginatorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  providers: [ProjectService],
})
export class ProjectsComponent implements OnInit {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  projects!: any[];
  projectPath!: string;
  singlePath!: string;

  columns!: Column[];
  actions!: Action[];

  constructor(
    private projectService: ProjectService,
    private routeService: RouteService,
    private router: Router,
    private adminService: AdminService,
  ) {}

  ngOnInit() {
    this.singlePath = this.routeService.getProjectsPath(
      ProjectsRouteType.Single,
    );

    this.projectPath = this.routeService.getProjectPath();

    this.columns = [
      { field: 'id', header: 'Id' },
      {
        field: 'identifier',
        header: 'Identifier',
        class: 'cursor-pointer no-underline hover:underline',
        onClick: (project: any) => {
          this.adminService.onSelectProject(project, () => {
            this.router.navigate([`${this.projectPath}`]);
          });
        },
      },
      { field: 'name', header: 'Name' },
      { field: 'platform', header: 'Platform' },
    ];

    this.actions = [
      {
        button: {
          icon: 'pi pi-pencil',
          severity: 'secondary',
          size: 'small',
          text: true,
        },
        onClick: (row: any) => this.onEditProject(row),
      },
      {
        button: {
          icon: 'pi pi-trash',
          severity: 'danger',
          size: 'small',
          text: true,
        },
        onClick: (row: any) => this.onDeleteProject(row),
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

  onEditProject(project: any) {
    this.router.navigate([`${this.singlePath}`, { id: project.id }]);
  }

  onDeleteProject(project: any) {}
}
