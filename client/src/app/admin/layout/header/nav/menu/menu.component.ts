import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../../../../routes.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, ButtonComponent, NgFor, ProductSwitchBodyComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class AppMenuComponent implements OnInit {
  items: any[] | undefined;
  
  constructor(private routerService: RouteService) {}

  ngOnInit() {
   /*  this.items = [
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
    ]; */
  }

  itemSwitcher: ProductSwitchItem[] = [
    {
        title: 'Projects',
        subtitle: 'All Projects',
        icon: 'it-system',
     
    },
    {
        title: 'Teams',
        subtitle: 'All Teams',
        icon: 'collaborate',
    },
    {
        title: 'Themes',
        subtitle: 'All Themes',
        icon: 'palette'
    },
    {
        title: 'Apps',
        icon: 'application-service',
        subtitle: 'Plugins/Widgets',
        font: "SAP-icons-TNT"
    },
   
];
}
