import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'auth-login',
  imports: [SharedModule, LayoutComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  email: string = '';
  password: string = '';

  onLogin() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {},
        (error) => {},
      );
  }
}
