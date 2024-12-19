import { Component, TemplateRef } from '@angular/core';
import { ProjectService } from './project.service';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from '../layout/main/main.component';

@Component({
  selector: 'app-projects',
  imports: [RouterOutlet, MainComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  providers: [ProjectService],
})
export class ProjectsComponent {
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
