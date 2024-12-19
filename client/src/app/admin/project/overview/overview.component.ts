import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Project } from '../../projects/interfaces/project.interface';
import { NgClass } from '@angular/common';
import { MainComponent } from '../../layout/main/main.component';

@Component({
  selector: 'app-overview',
  imports: [NgClass, MainComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  project!: Partial<Project> | null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.project$.subscribe((project) => {
      this.project = project;
    });
  }
}
