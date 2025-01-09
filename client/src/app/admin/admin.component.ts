import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AdminService } from './admin.service';
import { AppService } from '@app/app.service';
import { RouteService } from '@app/routes.service';
import { NgIf } from '@angular/common';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { catchError, finalize } from 'rxjs';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';


@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet,
    LayoutComponent,
    NgIf,
    MessageStripModule,
    PlatformLinkModule,
    BusyIndicatorModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [AdminService, provideDateTimeFormats()],
})
export class AdminComponent implements OnInit {
  isLoggedIn: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';
  message: string = '';

  showResendButton: boolean = false;

  isSending: boolean = false;

  constructor(
    private appService: AppService,
    private router: Router,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private adminService: AdminService,
    
  ) {
    this.appService.ready$.subscribe((state) => {
      if (state === 'logged-out') {
        const authBasePath = this.routeService.getAuthPath();

        const currentParams = this.route.snapshot.queryParams;
        const message = currentParams['message'];
        const status = currentParams['status'];

        const queryParams =
          status === 'success'
            ? { message }
            : status === 'error'
              ? { error: message }
              : {};

        this.router.navigate([authBasePath], { queryParams });
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;

        this.route.queryParams.subscribe((params) => {
          if (params['message']) {
            if (params['status'] === 'error')
              this.errorMessage = params['message'];
            if (params['status'] === 'success')
              this.successMessage = params['message'];
            else this.message = params['message'];

            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: {},
              replaceUrl: true,
            });
          }
        });
      }
    });
  }

  ngOnInit(): void {
    const user = this.appService.getCurrentUser();

    if (user && !user.emailVerified) {
      this.errorMessage =
        'Your email is not verified. Please check your inbox and verify your email.';
      this.showResendButton = true;
    }
  }

  resendVerificationLink(): void {
    this.isSending = true;

    this.adminService
      .sendVerificationEmail()
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Failed to send verification instructions. Please try again.';
           
          throw error;
        }),
        finalize(() => {
          this.isSending = false;
        }),
      )
      .subscribe((response) => {
        this.successMessage =
          'Email verification instructions have been sent to your email.';
          this.errorMessage = '';
          this.showResendButton = true;
      });
  }
}
