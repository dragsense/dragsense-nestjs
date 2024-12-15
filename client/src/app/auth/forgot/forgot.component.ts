import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from '../layout/layout.component';
import { AuthService } from '../auth.service';
import { AuthType } from '../../types/routes.type';
import { RouteService } from '../../routes.service';

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
    this.loginPath = this.routeService.getAuthPath(AuthType.Login);
  }
  onSubmit() {
    this.authService.forgot({ email: this.email }).subscribe(
      (response) => {},
      (error) => {},
    );
  }
}
