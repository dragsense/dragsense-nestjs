import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [AdminService],
})
export class AdminComponent {
  activeComponent: any;
  onRouteActivate(component: any) {
    setTimeout(() => {
      this.activeComponent = component;
    });
  }
}
