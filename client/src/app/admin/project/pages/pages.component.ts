import { Component, TemplateRef } from '@angular/core';
import { PageService } from './page.service';
import { MainComponent } from '../../layout/main/main.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  imports: [RouterOutlet, MainComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  providers: [PageService],
})
export class PagesComponent {
  headerTemplate!: TemplateRef<any>;
  footerTemplate!: TemplateRef<any>;

  onRouteActivate(component: any) {
    setTimeout(() => {
      if (component) {
        this.headerTemplate = component.headerTemplate;
        this.footerTemplate = component.footerTemplate;
      }
    });
  }
}
