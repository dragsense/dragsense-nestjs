import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { BreadcrumComponent } from '../breadcrum/breadcrum.component';
import { ProjectService } from '../../projects/project.service';
import { Project } from '../../projects/interfaces/project.interface';
import { Column } from '../table/interfaces/table.interface';
import { TableComponent } from '../table/table.component';
import { RouteService } from '../../../routes.service';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NavComponent,
    BreadcrumComponent,
    TableComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ProjectService]
})
export class HeaderComponent {

  projects: Partial<Project>[] = [];
  columns!: Column[];
  selectedProject!: any | null;
  projectPath!: string;

  @Input() isDarkMode: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  constructor(
    private projectService: ProjectService,
    private routeService: RouteService,
    private router: Router,
    private adminService: AdminService,
  ) {}

  ngOnInit() {
    this.projectPath = this.routeService.getProjectPath();

    this.columns = [
      { field: 'id', header: 'Id' },
      { field: 'identifier', header: 'Identifier' },
      { field: 'name', header: 'Name' },
    ];

    this.adminService.project$.subscribe((project) => {
      this.selectedProject = project;
    });

    // Initialize selected project from localStorage
    /* const storedProjectId = localStorage.getItem('projectId');
    if (storedProjectId) {
      const id = +storedProjectId;
      this.projectService.get(id).subscribe(
        (response) => {},
        (error) => {},
      );
    } */
  }

  onPopoverOpen(event: any) {
    if (this.projects.length === 0) {
      this.projects = [
        {
          id: 0,
          identifier: 'project1',
          name: 'My Project 1',
          desc: 'My Project 1',
          connected: true
        },
        {
          id: 1,
          identifier: 'project2',
          name: 'My Project 2',
          desc: 'My Project 2',
          connected: true
        },
        {
          id: 2,
          identifier: 'project3',
          name: 'My Project 3',
          desc: 'My Project 3',
        },
      ];
      /*
      this.projectService.getAll().subscribe(
        (response) => {},
        (error) => {},
      ); */
    }


  }

  onSelectProject(project: any) {

    this.adminService.onSelectProject(project, () => {
      this.router.navigate([`${this.projectPath}`]);
    });
  }

  onToggleTheme() {
    this.toggleTheme.emit();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
