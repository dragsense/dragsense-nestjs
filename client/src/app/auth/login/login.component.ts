import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import {  ButtonModule } from 'primeng/button';

@Component({
  selector: 'auth-login',
  imports: [RouterLink, Message, FormsModule, Divider, InputText, NgIf, ButtonModule],
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
