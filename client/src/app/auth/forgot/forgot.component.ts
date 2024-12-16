import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from '../layout/layout.component';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';

@Component({
  selector: 'app-forgot',
  imports: [SharedModule, LayoutComponent],
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
