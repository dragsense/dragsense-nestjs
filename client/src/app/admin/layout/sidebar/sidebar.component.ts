import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './menu/menu.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, MenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
}


