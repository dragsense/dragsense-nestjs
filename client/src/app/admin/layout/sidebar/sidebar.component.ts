import { Component, Input } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './menu/menu.component';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'app-sidebar',
  imports: [SharedModule, ScrollPanel, ButtonModule, MenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
}


