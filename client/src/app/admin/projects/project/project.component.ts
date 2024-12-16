import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { LayoutComponent } from '../../layout/layout.component';
import { RouteService } from '../../../routes.service';
import { PlatformType, Project } from '../interfaces/project.interface';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  imports: [
    LayoutComponent,
    FormsModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    MessageModule,
    RouterLink,
    ButtonModule,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  platformOptions = [
    { label: 'NodeJS', value: PlatformType.NodeJS },
    { label: 'Laravel', value: PlatformType.Laravel },
  ];

  project: Partial<Project> = {
    identifier: '',
    name: '',
    desc: '',
    domain: '',
    apiPrefix: '',
    apiVersion: '',
    platform: PlatformType.NodeJS,
  };

  projectsPath!: string;

  constructor(
    private routeService: RouteService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.projectsPath = this.routeService.getProjectsPath();

    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.project.identifier = 'Project ' + projectId;
      this.projectService.get(parseInt(projectId)).subscribe(
        (response) => {},
        (error) => {},
      );
    }
  }

  onSubmit(event: any) {
    console.log(this.project);
  }
}
