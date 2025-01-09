import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { AppService } from '@app/app.service';
import { RouteService } from '@app/routes.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [LayoutComponent, NgIf, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService],
})
export class AuthComponent {
  isLoggedOut: boolean = false;

  constructor(
    private appService: AppService,
    private router: Router,
    private routeService: RouteService,
  ) {
    this.appService.ready$.subscribe((state) => {
      if (state === 'logged-in') {
        const adminBasePath = this.routeService.getAdminPath();
        this.router.navigate([adminBasePath]);
        this.isLoggedOut = false;
      } else {
        this.isLoggedOut = true;
      }
    });
  }
}
