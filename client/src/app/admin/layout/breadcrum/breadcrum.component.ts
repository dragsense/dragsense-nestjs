import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrum',
  imports: [Breadcrumb],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.scss',
})
export class BreadcrumComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;


  ngOnInit() {

    this.items = [
      { label: 'Electronics' },
      { label: 'Computer' },
      { label: 'Accessories' },
      { label: 'Keyboard' },
      { label: 'Wireless' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
