import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-main',
  imports: [PanelModule, NgTemplateOutlet,NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  @Input() activeComponent: any;

  get headerTemplate() {
    return this.activeComponent?.headerTemplate;
  }

  get contentTemplate() {
    return this.activeComponent?.contentTemplate;
  }

  get footerTemplate() {
    return this.activeComponent?.footerTemplate;
  }
}
