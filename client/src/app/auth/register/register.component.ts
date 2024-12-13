import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'auth-register',
  imports: [SharedModule, LayoutComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  user: User = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
  };

  confirmPassword: string = '';

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
