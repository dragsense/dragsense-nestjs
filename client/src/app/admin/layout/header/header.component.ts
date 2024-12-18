import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { BreadcrumComponent } from '../breadcrum/breadcrum.component';
import { ButtonModule } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { CardModule } from 'primeng/card';
import { ProjectService } from '../../projects/project.service';
import { Project } from '../../projects/interfaces/project.interface';
import { Column } from '../table/interfaces/table.interface';
import { TableComponent } from '../table/table.component';
import { RouteService } from '../../../routes.service';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-header',
  imports: [
    CardModule,
    NavComponent,
    BreadcrumComponent,
    ButtonModule,
    PopoverModule,
    TableComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('op') op!: Popover;

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
        },
        {
          id: 1,
          identifier: 'project2',
          name: 'My Project 2',
        },
        {
          id: 2,
          identifier: 'project3',
          name: 'My Project 3',
        },
      ];
      /*
      this.projectService.getAll().subscribe(
        (response) => {},
        (error) => {},
      ); */
    }

    this.op.show(event);
  }

  onSelectProject(project: any) {
    this.op.hide();
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
