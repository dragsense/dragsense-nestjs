import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ThemeService } from '../../theme.service';
import { NgClass, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'auth-layout',
  imports: [
    CardModule,
    DividerModule,
    SplitterModule,
    ButtonModule,
    NgFor,
    NgClass,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [],
})
export class LayoutComponent implements OnInit {
  isDarkMode: boolean = false;
  socials = [
    {
      iconClasse: 'pi-youtube',
      url: 'https://www.youtube.com/@drag_sense',
      label: 'youtube',
    },
    {
      iconClasse: 'pi-twitter',
      url: `https://twitter.com/dragsense`,
      label: 'twitter',
    },
    {
      iconClasse: 'pi-linkedin',
      url: 'https://www.linkedin.com/company/drag-sense',
      label: 'linkedin',
    },
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.getDarkModeStatus();
  }

  onToggleTheme() {
    this.themeService.toggleDarkMode();
    this.isDarkMode = this.themeService.getDarkModeStatus();
  }
}
