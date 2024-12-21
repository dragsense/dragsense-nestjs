import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { RouterLink } from '@angular/router';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  imports: [RouterLink, FormsModule, NgIf],
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
