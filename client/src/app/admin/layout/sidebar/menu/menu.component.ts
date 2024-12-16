import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'sidebar-menu',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Overview',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Pages',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Components',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Collections',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Media',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Forms',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Styles',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      {
        label: 'Settings',
        icon: 'pi pi-plus',
        shortcut: '⌘+N',
      },
      
    ];
  }
}
