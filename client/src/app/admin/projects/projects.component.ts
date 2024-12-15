import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from './project.service';
import { Project } from './interfaces/project.interface';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-projects',
  imports: [TableModule, FormsModule, CommonModule, LayoutComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  providers: [ProjectService],
})
export class ProjectsComponent {
  projects!: Partial<Project>[];

  selectedProject!: Partial<Project>;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getAll().subscribe(
      (response) => {},
      (error) => {},
    );
  }
}
