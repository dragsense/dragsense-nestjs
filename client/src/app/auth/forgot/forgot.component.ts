import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forgot',
  imports: [RouterLink, Message, FormsModule, Divider, InputTextModule, NgIf, ButtonModule],
  providers: [AuthService],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent implements OnInit {
  constructor(private authService: AuthService,
    private routeService: RouteService,
  ) {}

  email: string = '';
  loginPath!: string;

  ngOnInit(): void {
    this.loginPath = this.routeService.getAuthPath(AuthRouteType.Login);
  }
  onSubmit() {
    this.authService.forgot({ email: this.email }).subscribe(
      (response) => {},
      (error) => {},
    );
  }
}
