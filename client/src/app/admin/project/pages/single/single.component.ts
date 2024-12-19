import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Page } from '../interfaces/page.interface';
import { PageService } from '../page.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouteService } from '../../../../routes.service';
import { ProjectRouteType } from '../../../../config/routes.config';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';

@Component({
  selector: 'project-page',
  imports: [RouterLink, InputTextModule, NgIf, ButtonModule, Message, FormsModule],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss',
})
export class SingleComponent {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  page: Partial<Page> = {
    name: '',
    slug: '',
  };

  pagesPath!: string;

  constructor(
    private routeService: RouteService,
    private route: ActivatedRoute,
    private projectService: PageService,
  ) {}

  ngOnInit() {
    this.pagesPath = this.routeService.getProjectPath(
      ProjectRouteType.PageList,
    );

    const pageId = this.route.snapshot.paramMap.get('id');
    if (pageId) {
      this.page.slug = 'page ' + pageId;
      this.projectService.get(parseInt(pageId)).subscribe(
        (response) => {},
        (error) => {},
      );
    }
  }

  onSubmit(event: any) {
    console.log(this.page);
  }
}