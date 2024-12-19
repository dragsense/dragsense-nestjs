import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';

import { Action, Column } from './interfaces/table.interface';
import { CommonModule, NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, CommonModule, NgClass, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns!: Column[];
  @Input() styleClass: string = '';
  @Input() actions: Action[] = [];
  @Input() selectedMode!: 'single' | 'multiple' | null | undefined;
  @Output() selectionChange = new EventEmitter<any>();

  onSelectionChange(event: any) {
    this.selectionChange.emit(event);
  }

  getDynamicClass(): string {
    const baseClass = '';
    return `${baseClass} ${this.styleClass}`;
  }
}
