import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [],
  imports: [RouterLink],
  exports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    MessageModule,
  ],
  providers: [AuthService],
})
export class SharedModule {}
