import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from '@fundamental-ngx/core/table';
import { Column, Action } from './interfaces/table.interface';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarSpacerDirective,
    TitleComponent,
    TableModule,
    BusyIndicatorComponent,
    InputGroupModule,
    ButtonComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() columns: Column[] = [];
  @Input() actions: Action[] = [];

  @Output() actionTriggered = new EventEmitter<{ action: Action; row: any }>();

  onActionClick(action: Action, row: any) {
   
    this.actionTriggered.emit({ action, row });
  }
}
