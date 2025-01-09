import { Component, Input } from '@angular/core';
import { PageEvent } from './interfaces/paginator.interface';
import { PaginationModule } from '@fundamental-ngx/core/pagination';

@Component({
  selector: 'app-paginator',
  imports: [PaginationModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  totalItems = 50;
  itemsPerPage = 10;
  currentPage = 1;

  pageChanged(event: number): void {
    this.currentPage = event;
}
}
