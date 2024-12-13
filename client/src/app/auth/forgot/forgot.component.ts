import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from '../layout/layout.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot',
  imports: [SharedModule, LayoutComponent],
  providers: [AuthService],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.forgot({ email: this.email }).subscribe(
      (response) => {},
      (error) => {},
    );
  }
}
