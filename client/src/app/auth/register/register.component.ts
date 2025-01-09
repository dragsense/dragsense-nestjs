import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormModule } from '@fundamental-ngx/core/form';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { catchError, finalize } from 'rxjs';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';

@Component({
  selector: 'auth-register',
  imports: [
    RouterLink,
    FormsModule,
    FormModule,
    NgIf,
    ButtonComponent,
    MessageStripModule,
    BusyIndicatorComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: Partial<User> = {
    firstname: '',
    lastname: '',
    password: '',
    email: ''
  };
  confirmPassword: string = '';
  loginPath!: string;
  submitError: string = '';

  firstnameError: string = '';
  lastnameError: string = '';
  emailError: string = '';
  submitSuccess: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginPath = this.routeService.getAuthPath(AuthRouteType.Login);
  }

  validateFirstName(): void {
    const namePattern = /^[A-Za-z]+$/;
    if (!this.user.firstname) {
      this.firstnameError = '';
    } else if (!namePattern.test(this.user.firstname)) {
      this.firstnameError = 'First name must contain only alphabets.';
    } else if (this.user.firstname.length < 3) {
      this.firstnameError = 'First name must be at least 3 characters long.';
    } else {
      this.firstnameError = '';
    }
  }

  validateLastName(): void {
    const namePattern = /^[A-Za-z]+$/;
    if (!this.user.lastname) {
      this.lastnameError = 'Last name is required.';
    } else if (!namePattern.test(this.user.lastname)) {
      this.lastnameError = 'Last name must contain only alphabets.';
    } else if (this.user.lastname.length < 3) {
      this.lastnameError = 'Last name must be at least 3 characters long.';
    } else {
      this.lastnameError = '';
    }
  }

  validateEmail(): void {
    if (!this.user.email) {
      this.emailError = 'Email is required.';
    } else if (!this.isValidEmail(this.user.email)) {
      this.emailError = 'Invalid email format.';
    } else {
      this.emailError = '';
    }
  }

  validatePassword(): void {
    if (!this.user.password) {
      this.passwordError = 'Password is required.';
    } else if (this.user.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long.';
    } else {
      this.passwordError = '';
    }
  }

  validateConfirmPassword(): void {
    this.confirmPasswordError =
      this.user.password !== this.confirmPassword
        ? 'Passwords do not match.'
        : '';
  }

  hasErrors(): boolean {
    return (
      !!this.firstnameError ||
      !!this.lastnameError ||
      !!this.emailError ||
      !!this.passwordError ||
      !!this.confirmPasswordError
    );
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  onRegister(): void {
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    if (this.hasErrors()) {
      return;
    }

    this.submitError = '';
    this.submitSuccess = '';

    this.isSubmitting = true;

    this.authService
      .register(this.user)
      .pipe(
        catchError((error) => {
          this.submitError = 'Registration failed. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
      .subscribe((response) => {
        this.submitSuccess =
          'Registration successful. Email verification has been sent to your email. Please verify your email to log in.';
        this.router.navigate([this.loginPath], {
          queryParams: { message: this.submitSuccess },
        });
      });
  }
}
