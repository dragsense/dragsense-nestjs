import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { RouterLink } from '@angular/router';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModule } from '@fundamental-ngx/core/form';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-forgot',
  imports: [
    RouterLink,
    FormsModule,
    FormModule,
    ButtonComponent,
    NgIf,
    InputGroupModule,
    MessageStripModule,
    BusyIndicatorComponent,
  ],
  providers: [AuthService],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
  ) {}

  isSubmitting: boolean = false;

  email: string = '';

  emailError: string = '';
  emailState: 'success' | 'error' | 'default' = 'default';

  submitError: string = '';
  submitSuccess: string = '';

  loginPath!: string;

  ngOnInit(): void {
    this.loginPath = this.routeService.getAuthPath(AuthRouteType.Login);
  }

  hasErrors(): boolean {
    return this.emailState === 'error';
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

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  onSubmit() {
    this.validateEmail();
    if (this.hasErrors()) {
      return;
    }

    this.submitError = '';
    this.submitSuccess = '';

    this.isSubmitting = true;

    this.authService
      .forgot({ email: this.email })
      .pipe(
        catchError((error) => {
          this.submitError =
            'Failed to send reset instructions. Please try again later.';
          throw error;
        }),
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
      .subscribe((response) => {
        this.submitSuccess =
          'Password reset instructions have been sent to your email.';
        this.email = '';
      });
  }
}
