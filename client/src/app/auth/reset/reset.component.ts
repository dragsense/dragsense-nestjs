import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  imports: [SharedModule, LayoutComponent],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export class ResetComponent {
  constructor(private authService: AuthService) {}

  password: string = '';
  confirmPassword: string = '';


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
