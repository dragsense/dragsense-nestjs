import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { BreadcrumComponent } from '../breadcrum/breadcrum.component';
import { ButtonModule } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-header',
  imports: [CardModule, NavComponent, BreadcrumComponent, ButtonModule, PopoverModule, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('op') op!: Popover;

  projects: string[] = ['Project Alpha', 'Project Beta', 'Project Gamma'];
  selectedProject: string | null = null;

  @Input() isDarkMode: boolean = false;
  @Output() toggleSidebar = new EventEmitter<any>();
  @Output() toggleTheme = new EventEmitter<any>();


  constructor() {}


  onToggleTheme() {
    this.toggleTheme.emit(null);
  }

  toggle(event: any) {
    this.op.toggle(event);
  }

  onSelectProject(project: string) {
    this.selectedProject = project;
    this.op.hide();
  }


  onToggleSidebar() {
    this.toggleSidebar.emit(null);
  }
}
