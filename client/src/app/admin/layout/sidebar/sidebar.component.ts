import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

import { FdbNavigationState } from '@fundamental-ngx/btp/navigation';
import { AdminService } from '@app/admin/admin.service';

@Component({
  selector: 'app-sidebar',
  imports: [MenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  state: FdbNavigationState = 'expanded';

  constructor(private adminService: AdminService) {
    this.adminService.sidebarState$.subscribe((state) => {
      this.state = state ? 'expanded' : 'snapped';
    });
  }
}
