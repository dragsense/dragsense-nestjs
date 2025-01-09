import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Project } from '../../projects/interfaces/project.interface';
import { NgClass, NgIf } from '@angular/common';
import { MainComponent } from '../../layout/main/main.component';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { RouteService } from '@app/routes.service';
import { ProjectRouteType } from '@config/routes.config';
import { RouterLink } from '@angular/router';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';

@Component({
  selector: 'app-overview',
  imports: [NgClass, RouterLink, NgIf, MainComponent, QuickViewModule, ActionBarModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  project!: Partial<Project> | null;

  settingsPath: string = '';

  constructor(
    private adminService: AdminService,
    private routeServie: RouteService,
  ) {}

  ngOnInit() {
    this.adminService.project$.subscribe((project) => {
      this.project = project;
    });

    this.settingsPath = this.routeServie.getProjectPath(
      ProjectRouteType.Settings,
    );
  }

  getApiUrl(project: any): string {
    if (!project) {
      return 'No API URL Available';
    }
    return this.adminService.getProjectApiUrl();
  }
}
