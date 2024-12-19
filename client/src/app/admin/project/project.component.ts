import { Component, TemplateRef } from '@angular/core';
import { MainComponent } from '../layout/main/main.component';

@Component({
  selector: 'app-project',
  imports: [MainComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
}
