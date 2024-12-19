import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-main',
  imports: [PanelModule, NgTemplateOutlet, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() footerTemplate!: TemplateRef<any>;
}
