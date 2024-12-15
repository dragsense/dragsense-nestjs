import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth.service';
import { RouteService } from '../routes.service';
import { AuthType } from '../types/routes.type';

@Component({
  selector: 'auth-login',
  imports: [SharedModule, LayoutComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
  ) {}

  email: string = '';
  password: string = '';
  registerPath!: string;
  forgotPath!: string;

  ngOnInit(): void {
    this.registerPath = this.routeService.getAuthPath(AuthType.Register);
    this.forgotPath = this.routeService.getAuthPath(AuthType.Forgot);
  }

  onLogin() {
    this.authService
      .auth({ email: this.email, password: this.password })
      .subscribe(
        (response) => {},
        (error) => {},
      );
  }
}
