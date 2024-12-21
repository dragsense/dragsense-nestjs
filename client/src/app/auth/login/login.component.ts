import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '@app/routes.service';
import { AuthRouteType } from '@config/routes.config';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'auth-login',
  imports: [RouterLink, FormsModule, NgIf, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
  adminPath!: string;

  ngOnInit(): void {
    this.registerPath = this.routeService.getAuthPath(AuthRouteType.Register);
    this.forgotPath = this.routeService.getAuthPath(AuthRouteType.Forgot);
    this.adminPath = this.routeService.getAdminPath();
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
