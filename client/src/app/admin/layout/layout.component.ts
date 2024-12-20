import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ThemeService } from '../../theme.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'admin-layout',
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {

  isSidebarVisible: boolean = true;
  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.getDarkModeStatus();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
    this.isDarkMode = this.themeService.getDarkModeStatus();
  }
}
