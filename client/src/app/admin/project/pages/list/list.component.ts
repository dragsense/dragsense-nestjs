import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PageService } from '../page.service';
import { RouteService } from '../../../../routes.service';
import {
  Action,
  Column,
} from '../../../layout/table/interfaces/table.interface';
import { ProjectRouteType } from '../../../../config/routes.config';
import { Router, RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../../layout/paginator/paginator.component';
import { TableComponent } from '../../../layout/table/table.component';

@Component({
  selector: 'project-pages',
  imports: [RouterLink, PaginatorComponent, TableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [PageService],
})
export class ListComponent {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  pages!: any[];
  singlePath!: string;

  columns!: Column[];
  actions!: Action[];

  constructor(
    private pageService: PageService,
    private routeService: RouteService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.singlePath = this.routeService.getProjectPath(
      ProjectRouteType.PageSingle,
    );

    this.columns = [
      { field: 'id', header: 'Id' },
      {
        field: 'slug',
        header: 'Slug',
      },
      { field: 'name', header: 'Name' },
    ];

    this.actions = [
      {
        button: {
          icon: 'pi pi-pencil',
        },
        command: (row: any) => this.onEditPage(row),
      },
      {
        button: {
          icon: 'pi pi-trash',
        },
        command: (row: any) => this.onDeletePage(row),
      },
    ];

    this.pages = [
      {
        id: 0,
        slug: 'page1',
        name: 'Page 1',
      },
      {
        id: 0,
        slug: 'page2',
        name: 'Page 2',
      },
      {
        id: 0,
        slug: 'page3',
        name: 'Page 3',
      },
    ];

    this.pageService.getAll().subscribe(
      (response) => {},
      (error) => {},
    );
  }

  onEditPage(page: any) {
    this.router.navigate([`${this.singlePath}`, { id: page.id }]);
  }

  onDeletePage(project: any) {}
}
