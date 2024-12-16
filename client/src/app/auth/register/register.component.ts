import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../auth.service';
import { RouteService } from '../../routes.service';
import { AuthRouteType } from '../../config/routes.config';

@Component({
  selector: 'auth-register',
  imports: [SharedModule, LayoutComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService,
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
