import { Component, Input } from '@angular/core';
import { PageEvent } from './interfaces/paginator.interface';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() rows: number = 10;
  @Input() first: number = 0;
  @Input() total: number = 0;
  @Input() styleClass: string = '';

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
