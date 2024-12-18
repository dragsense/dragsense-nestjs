import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { RouteService } from '../../../../../routes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [Menubar, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  profileitems: MenuItem[] | undefined;

  constructor(private routerService: RouteService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Projects',
        icon: 'pi pi-server',
        route: this.routerService.getProjectsPath(),
      },
      {
        label: 'Teams',
        icon: 'pi pi-users',
        route: this.routerService.getAdminPath(),
      },
      {
        label: 'Themes',
        icon: 'pi pi-palette',
        route: this.routerService.getAdminPath(),
      },
      {
        label: 'Apps',
        icon: 'pi pi-shop',
        route: this.routerService.getAdminPath(),
      },
    ];

    this.profileitems = [
      {
        label: 'Options',
        items: [
          {
            label: 'Account',
            icon: 'pi pi-cog',
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
          },
        ],
      },
    ];
  }
}
