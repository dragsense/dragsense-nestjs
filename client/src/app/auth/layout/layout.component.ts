import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ThemeService } from '../../theme.service';
import { NgClass, NgFor } from '@angular/common';
import { socials } from '../../../assets/social';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';


@Component({
  selector: 'auth-layout',
  imports: [CardModule, DividerModule, SplitterModule, ButtonModule, NgFor, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [],
})
export class LayoutComponent implements OnInit {
  isDarkMode: boolean = false;
  socials = socials;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.getDarkModeStatus();
  }

  onToggleTheme() {
    this.themeService.toggleDarkMode();
    this.isDarkMode = this.themeService.getDarkModeStatus();
    
  }
}
