import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { PlatformType } from '../interfaces/project.interface';
import { TableComponent } from '../../layout/table/table.component';
import { PaginatorComponent } from '../../layout/paginator/paginator.component';
import { RouteService } from '../../../routes.service';
import { Router, RouterLink } from '@angular/router';
import { Action, Column } from '../../layout/table/interfaces/table.interface';
import { ProjectsRouteType } from '../../../config/routes.config';
import { AdminService } from '../../admin.service';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import {
  BarComponent,
  BarRightDirective,
  ButtonBarComponent,
} from '@fundamental-ngx/core/bar';
import { catchError, finalize } from 'rxjs';
import { NgIf } from '@angular/common';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';

@Component({
  selector: 'projects-list',
  imports: [
    RouterLink,
    TableComponent,
    PaginatorComponent,
    ButtonComponent,
    ActionBarModule,
    BarComponent,
    BarRightDirective,
    ButtonBarComponent,
    NgIf,
    MessageStripModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  projects: any[] = [];
  projectPath: string = '';
  singlePath: string = '';

  columns: Column[] = [];
  actions: Action[] = [];

  errorMessage: string = '';

  loading = false;

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
      { field: 'id', header: 'ID' },
      {
        field: 'identifier',
        header: 'Identifier',
        onClick: (project) => this.onSelectProject(project),
      },
      { field: 'name', header: 'Name' },
      { field: 'platform', header: 'Platform' },
    ];

    this.actions = [
      {
        button: {
          icon: 'edit',
          type: 'transparent',
        },
        command: (project) => this.onEditProject(project),
      },
      {
        button: {
          type: 'transparent',
          label: 'delete',
        },
        popover: {
          title: 'Delete Project',
          subHeading: 'This action cannot be undone. Do you want to delete this project?',
        },
        command: (project) => this.onDeleteProject(project),
      },
    ];

    this.fetchProjects();
  }

  fetchProjects() {
    this.loading = true;
    this.errorMessage = '';

    this.projectService
      .getAll()
      .pipe(
        catchError((error) => {
          this.errorMessage = 'An unexpected error occurred. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.projects = response;
      });
  }

  deleteProject(id: number) {
    this.loading = true;
    this.errorMessage = '';

    this.projectService
      .delete(id)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'An unexpected error occurred. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.fetchProjects();
      });
  }

  onSelectProject(project: any) {
    this.adminService.onSelectProject(project, () => {
      this.router.navigate([this.projectPath]);
    });
  }

  onEditProject(project: any) {
    this.router.navigate([`${this.singlePath}`, { id: project.id }]);
  }

  onDeleteProject(project: any) {
    if (project && project.id) {
      this.deleteProject(project.id);
    }
  }
}
