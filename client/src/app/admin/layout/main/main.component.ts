import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'app-main',
  imports: [ScrollPanel, PanelModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
