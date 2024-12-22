import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { TextComponent } from '@components/text/text.component';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, LayoutComponent, ButtonComponent, InputComponent, TextComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent {}
