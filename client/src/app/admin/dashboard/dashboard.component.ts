import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MainComponent } from '../layout/main/main.component';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { RouteService } from '@app/routes.service';
import { ProjectsRouteType } from '@config/routes.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MainComponent, ButtonComponent, ActionBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  projectsPath!: string;
  singleProjectPath: string = '';

  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.projectsPath = this.routeService.getProjectsPath();

    this.singleProjectPath = this.routeService.getProjectsPath(
      ProjectsRouteType.Single,
    );
  }
}
