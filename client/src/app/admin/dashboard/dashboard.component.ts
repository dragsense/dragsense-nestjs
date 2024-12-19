import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MainComponent } from '../layout/main/main.component';

@Component({
  selector: 'app-dashboard',
  imports: [MainComponent, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

}
