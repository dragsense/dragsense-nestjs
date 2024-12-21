import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../../routes.service';
import { ProjectRouteType } from '../../../../config/routes.config';

@Component({
  selector: 'sidebar-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  items: any[] | undefined;

  constructor(private routerService: RouteService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Overview',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.Overview),
      },
      {
        label: 'Pages',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.PageList),
      },
      {
        label: 'Components',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.ComponentList),
      },
      {
        label: 'Collections',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.CollectionList),
      },
      {
        label: 'Forms',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.FormList),
      },
      {
        label: 'Media',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.Media),
      },
      {
        label: 'Code',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.Code),
      },
      {
        label: 'Styles',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.Styles),
      },
      {
        label: 'Settings',
        icon: 'pi pi-plus',
        routerLink: this.routerService.getProjectPath(ProjectRouteType.Settings),
      },
    ];
  }
}
