import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrum.service';


@Component({
  selector: 'app-breadcrum',
  imports: [],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.scss',
  providers: [BreadcrumbService],
})
export class BreadcrumComponent implements OnInit {
  items: any[] | undefined;

  home: any = { icon: 'pi pi-home', routerLink: '/' };

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
