import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';

@Component({
  selector: 'app-reset',
  imports: [SharedModule, LayoutComponent],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export class ResetComponent implements OnInit {
  constructor(private authService: AuthService,
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
