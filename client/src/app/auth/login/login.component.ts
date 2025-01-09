import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '@app/routes.service';
import { AuthRouteType } from '@config/routes.config';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormModule } from '@fundamental-ngx/core/form';
import { NgIf } from '@angular/common';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { catchError, finalize } from 'rxjs';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { API } from '@config/api.config';

@Component({
  selector: 'auth-login',
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    MessageStripModule,
    FormModule,
    InputGroupModule,
    ButtonComponent,
    BusyIndicatorComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  email: string = '';
  password: string = '';

  error: string = '';

  emailError: string = '';
  passwordError: string = '';
  submitError: string = '';
  submitSuccess: string = '';
  isSubmitting: boolean = false;

  emailState: 'success' | 'error' | 'default' = 'default';
  passwordState: 'success' | 'error' | 'default' = 'default';

  registerPath!: string;
  forgotPath!: string;

  ngOnInit(): void {
    this.registerPath = this.routeService.getAuthPath(AuthRouteType.Register);
    this.forgotPath = this.routeService.getAuthPath(AuthRouteType.Forgot);

    this.route.queryParams.subscribe((params) => {

      if (params['message']) {
        this.submitSuccess = params['message'];
      }

      if (params['error']) {
        this.submitError = params['error'];
      }

      if (params['message'] || params['error']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true,
        });
      }
    });
  }

  hasErrors(): boolean {
    return this.emailState === 'error' || this.passwordState === 'error';
  }

  validateEmail(): void {
    if (!this.email) {
      this.emailError = 'Email is required.';
      this.emailState = 'error';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Invalid email format.';
      this.emailState = 'error';
    } else {
      this.emailError = '';
      this.emailState = 'success';
    }
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = 'Password is required.';
      this.passwordState = 'error';
    } else if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters.';
      this.passwordState = 'error';
    } else {
      this.passwordError = '';
      this.passwordState = 'success';
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  onGitHubLogin(): void {
    window.location.href = API.auth.github;
  }

  onLogin(): void {
    this.validateEmail();
    this.validatePassword();

    if (this.hasErrors()) {
      return;
    }

    this.submitError = '';
    this.submitSuccess = '';

    this.isSubmitting = true;

    this.authService
      .auth({ email: this.email, password: this.password })
      .pipe(
        catchError((error) => {
          this.submitError =
            'Login failed. Please check your credentials and try again.';
          throw error;
        }),
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
      .subscribe((response) => {
        this.submitSuccess = 'Login successful.';
        this.email = '';
      });
  }
}
