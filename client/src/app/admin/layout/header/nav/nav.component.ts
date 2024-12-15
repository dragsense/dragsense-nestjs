import { Component, Input, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-nav',
  imports: [Divider, ButtonModule, Menu, MenuComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {

  @Input() isDarkMode: boolean = false;
  @Input() onToggleTheme!: () => void;
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Account',
            icon: 'pi pi-cog',
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
          },
        ],
      },
    ];
  }
}
