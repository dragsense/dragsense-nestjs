import { Component, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from '../layout/main/main.component';
import { TeamsService } from './teams.service';


@Component({
  selector: 'app-teams',
  imports: [RouterOutlet, MainComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  providers: [TeamsService]
})
export class TeamsComponent {
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
