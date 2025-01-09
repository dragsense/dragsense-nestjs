import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, BusyIndicatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
}) 
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private appService: AppService) {
    this.appService.ready$.subscribe((state) => {
      if (state !== 'pending') {
        this.isLoading = false;
      } else {
        this.isLoading = true;
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.appService.initializeApp();
    });
  }
}
