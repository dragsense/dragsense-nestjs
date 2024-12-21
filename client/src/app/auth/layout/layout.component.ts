import { Component, OnInit } from '@angular/core';

import { ThemeService } from '@app/theme.service';
import { NgClass, NgFor } from '@angular/common';
import { AuthService } from '../auth.service';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'auth-layout',
  imports: [
    NgFor,
    NgClass,
    ButtonComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [AuthService],
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
