import { Component, Input, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Divider } from 'primeng/divider';
import { AdminService } from '../../../admin.service';

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

  constructor(private adminService: AdminService) {}

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
            command: () => {
              this.signOut();
          }
          },
        ],
      },
    ];
  }

  signOut() {
    this.adminService.signOut();
}
}
