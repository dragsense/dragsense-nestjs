import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';

@Component({
  selector: 'auth-register',
  imports: [
    RouterLink,
    Message,
    FormsModule,
    Divider,
    ButtonModule,
    InputTextModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
  ) {}

  user: User = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
  };

  confirmPassword: string = '';
  loginPath!: string;

  ngOnInit(): void {
    this.loginPath = this.routeService.getAuthPath(AuthRouteType.Login);
  }

  onRegister() {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.authService.register(this.user).subscribe(
      (response) => {},
      (error) => {},
    );
  }
}
