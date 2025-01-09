import {
  ChangeDetectionStrategy,
  OnInit,
  Component,
  ViewEncapsulation,
  Input,
} from '@angular/core';

import { RouteService } from '../../../../routes.service';
import {
  AdminRouteType,
  ProjectRouteType,
} from '../../../../config/routes.config';
import { RouterLink } from '@angular/router';

import {
  FDB_NAVIGATION,
  FdbNavigationState,
} from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { NgFor, NgIf } from '@angular/common';
import { AdminService } from '@app/admin/admin.service';
import { Project } from '@app/admin/projects/interfaces/project.interface';

@Component({
  selector: 'sidebar-menu',
  imports: [RouterLink, NgIf, NgFor, FDB_NAVIGATION],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() state: FdbNavigationState = 'expanded';

  mode: FdbViewMode = '';
  project!: Project | null;

  constructor(
    private routerService: RouteService,
    private adminService: AdminService,
  ) {
    this.adminService.project$.subscribe((project) => {
      this.project = project;
    });
  }

  routerLinks: any;

  ngOnInit() {
    this.routerLinks = {
      dashbaord: this.routerService.getAdminPath(AdminRouteType.Dashboard),
      projects: this.routerService.getAdminPath(AdminRouteType.Projects),
      project: {
        overview: this.routerService.getProjectPath(ProjectRouteType.Overview),
        pages: this.routerService.getProjectPath(ProjectRouteType.PageList),
        components: this.routerService.getProjectPath(
          ProjectRouteType.ComponentList,
        ),
        collections: this.routerService.getProjectPath(
          ProjectRouteType.CollectionList,
        ),
        forms: this.routerService.getProjectPath(
          ProjectRouteType.CollectionList,
        ),
        cssCode: this.routerService.getProjectPath(ProjectRouteType.Code),
        jsCode: this.routerService.getProjectPath(ProjectRouteType.Code),
        styles: this.routerService.getProjectPath(ProjectRouteType.Settings),
        settings: this.routerService.getProjectPath(ProjectRouteType.Settings),
      },
    };
  }
}
