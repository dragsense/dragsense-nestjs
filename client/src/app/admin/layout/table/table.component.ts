import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';

import { Action, Column } from './interfaces/table.interface';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns!: Column[];
  @Input() styleClass: string = '';
  @Input() actions: Action[] = [];

  onActionClick(action: any, row: any) {
    action(row);
  }
}
