import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../../../../routes.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
  ProductSwitchBodyComponent,
  ProductSwitchItem,
} from '@fundamental-ngx/core/product-switch';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, ButtonComponent, NgFor, ProductSwitchBodyComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class AppMenuComponent implements OnInit {
  items: any[] | undefined;

  constructor(
    private routerService: RouteService,
    private router: Router,
  ) {}

  ngOnInit() {}

  itemSwitcher: ProductSwitchItem[] = [
    {
      title: 'Projects',
      subtitle: 'Your Projects',
      icon: 'it-system',
      selected: false,
      callback: (event: MouseEvent) => {
        this.selectItem('Projects');
        const projectsPath = this.routerService.getProjectsPath();
        this.router.navigate([`${projectsPath}`]);
      },
    },
    {
      title: 'Teams',
      subtitle: 'Your Teams',
      icon: 'collaborate',
      selected: false,
      callback: (event: MouseEvent) => {
        this.selectItem('Teams');
        const teamsPath = this.routerService.getTeamsPath();
        this.router.navigate([`${teamsPath}`]);
      },
    },
    {
      title: 'Themes',
      subtitle: 'Public Themes',
      icon: 'palette',
      selected: false,
    },
    {
      title: 'Apps',
      icon: 'application-service',
      subtitle: 'Plugins/Widgets',
      font: 'SAP-icons-TNT',
      selected: false,
    },
  ];

  selectItem(title: string): void {
    this.itemSwitcher.forEach((item) => {
      item.selected = item.title === title;
    });
  }
}
