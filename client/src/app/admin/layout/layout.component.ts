import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AppThemeService } from '../../theme.service';
import { NgIf } from '@angular/common';
import { BreadcrumComponent } from '../layout/breadcrum/breadcrum.component';


import {
  ToolLayoutComponent,
  ToolLayoutContainerDirective,
  ToolLayoutContentContainerDirective,
  ToolLayoutHeaderContainerDirective,
  ToolLayoutNavigationContainerDirective
} from '@fundamental-ngx/btp/tool-layout';
import { BarComponent, BarMiddleDirective } from '@fundamental-ngx/core/bar';

@Component({
  selector: 'admin-layout',
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NgIf,
    ToolLayoutComponent,
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutHeaderContainerDirective,
    ToolLayoutNavigationContainerDirective,
    BreadcrumComponent,
    BarComponent, BarMiddleDirective
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {

  isSidebarVisible: boolean = true;

  constructor() {}

  ngOnInit() {
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

}
