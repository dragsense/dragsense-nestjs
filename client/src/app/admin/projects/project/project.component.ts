import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { RouteService } from '../../../routes.service';
import { PlatformType, Project } from '../interfaces/project.interface';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProjectService } from '../project.service';
import { NgIf } from '@angular/common';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-project',
  imports: [
    FormsModule,
    InputTextModule,
    TextareaModule,
    MessageModule,
    RouterLink,
    ButtonModule,
    Select,
    NgIf
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {


    @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
    @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

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
