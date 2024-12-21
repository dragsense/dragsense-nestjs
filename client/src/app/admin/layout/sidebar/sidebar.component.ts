import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
}


