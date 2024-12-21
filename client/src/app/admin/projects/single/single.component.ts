import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouteService } from '../../../routes.service';
import { PlatformType, Project } from '../interfaces/project.interface';

import { ProjectService } from '../project.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss',
})
export class SingleComponent {


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
