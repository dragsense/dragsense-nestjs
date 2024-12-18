import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset',
  imports: [
    RouterLink,
    Message,
    FormsModule,
    Divider,
    InputTextModule,
    ButtonModule,
    NgIf
  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export class ResetComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
  ) {}

  password: string = '';
  confirmPassword: string = '';
  loginPath!: string;

  ngOnInit(): void {
    this.loginPath = this.routeService.getAuthPath(AuthRouteType.Login);
  }

  onReset() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.authService.reset({ password: this.password }).subscribe(
      (response) => {},
      (error) => {},
    );
  }
}
