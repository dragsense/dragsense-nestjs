import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormModule } from '@fundamental-ngx/core/form';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { catchError, finalize } from 'rxjs';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';

@Component({
  selector: 'app-reset',
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    FormModule,
    ButtonComponent,
    MessageStripModule,
    BusyIndicatorComponent
  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export class ResetComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  submitError: string = '';
  submitSuccess: string = '';

  password: string = '';
  confirmPassword: string = '';
  loginPath!: string;

  passwordError: string = '';
  confirmPasswordError: string = '';

  isSubmitting: boolean = false;

  token: string = '';

  ngOnInit(): void {
    this.loginPath = this.routeService.getAuthPath(AuthRouteType.Login);
  
    this.route.queryParams.subscribe((params) => {

      this.token = params['token'] || '';
      if(!this.token) 
        this.router.navigate([this.loginPath])
    });
  
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = 'Password is required.';
    } else if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long.';
    } else {
      this.passwordError = '';
    }
  }

  validateConfirmPassword(): void {
    this.confirmPasswordError =
      this.password !== this.confirmPassword ? 'Passwords do not match.' : '';
  }

  hasErrors(): boolean {
    return !!this.passwordError || !!this.confirmPasswordError;
  }

  onReset() {
    this.validatePassword();
    this.validateConfirmPassword();

    if (this.hasErrors()) {
      return;
    }

    this.isSubmitting = true;

    this.authService
      .reset({ password: this.password, token: this.token })
      .pipe(
        catchError((error) => {
          this.submitError = 'Rest password failed. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
      .subscribe((response) => {
        this.submitError = 'Reset passwrod successful.';
        this.router.navigate([this.loginPath], { queryParams: { message: this.submitError } });


      });
  }
}
