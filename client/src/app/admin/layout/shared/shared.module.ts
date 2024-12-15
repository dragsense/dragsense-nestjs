import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';

@NgModule({
  declarations: [],
  exports: [Divider, Card, CommonModule],
  imports: [Divider, Card, CommonModule],
})
export class SharedModule {}
