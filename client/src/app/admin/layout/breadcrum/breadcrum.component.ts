import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from './breadcrum.service';

import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrum',
  imports: [Breadcrumb],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.scss',
  providers: [BreadcrumbService],
})
export class BreadcrumComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      if (breadcrumbs.length > 0) {
        breadcrumbs[breadcrumbs.length - 1].disabled = true;
      }
      this.items = breadcrumbs;
    }); 
  }
}
