import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AppMenuComponent } from './menu/menu.component';

import { AdminService } from '../../../admin.service';
import { BarComponent } from '@fundamental-ngx/core/bar';
import {
  ButtonComponent,
  ButtonBadgeDirective,
} from '@fundamental-ngx/core/button';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarLeftDirective } from '@fundamental-ngx/core/bar';
import { BarMiddleDirective } from '@fundamental-ngx/core/bar';
import { BarRightDirective } from '@fundamental-ngx/core/bar';
import { BarElementDirective } from '@fundamental-ngx/core/bar';
import {
  FdbToolHeaderActionButton,
  ToolHeaderLogoDirective,
  ToolHeaderActionButtonDirective,
  ToolHeaderActionDirective,
  ToolHeaderActionSeparatorComponent,
  ToolHeaderAutoModeDirective,
  ToolHeaderComponent,
  ToolHeaderProductSwitchComponent,
  ToolHeaderUserDirective,
} from '@fundamental-ngx/btp/tool-header';
import { NavigationMenuItemComponent } from '@fundamental-ngx/btp/navigation-menu';
import { ToolHeaderButtonDirective } from '@fundamental-ngx/btp/button';

import {
  MenuAddonDirective,
  MenuComponent,
  MenuInteractiveComponent,
  MenuItemComponent,
  MenuTitleDirective,
  MenuTriggerDirective,
} from '@fundamental-ngx/core/menu';

import {
  DialogModule,
  DialogRef,
  DialogService,
} from '@fundamental-ngx/core/dialog';

import { NgFor } from '@angular/common';
import { AppThemeService } from '@app/theme.service';
import { User } from '@app/auth/interfaces/user.interface';
import { AppService } from '@app/app.service';
import { RouteService } from '@app/routes.service';
import { Router } from '@angular/router';
import { AdminRouteType } from '@config/routes.config';
import { ProfileComponent } from '@app/admin/profile/profile.component';

@Component({
  selector: 'app-nav',
  imports: [
    ButtonBadgeDirective,
    ToolHeaderComponent,
    ToolHeaderLogoDirective,
    ToolHeaderAutoModeDirective,
    ToolHeaderActionButtonDirective,
    ToolHeaderActionDirective,
    ToolHeaderActionSeparatorComponent,
    ToolHeaderUserDirective,
    AppMenuComponent,
    MenuComponent,
    BarLeftDirective,
    BarElementDirective,
    BarRightDirective,
    BarComponent,
    ButtonComponent,
    AvatarComponent,
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    ToolHeaderButtonDirective,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective,
    NgFor,
    ToolHeaderProductSwitchComponent,
    NavigationMenuItemComponent,
    DialogModule,
    ProfileComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  isDarkMode: boolean = false;
  user: Partial<User> | null = null;

  actions!: FdbToolHeaderActionButton[];

  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;

  constructor(
    private adminService: AdminService,
    private themeService: AppThemeService,
    private appService: AppService,
    private routeService: RouteService,
    private router: Router,
    private _dialogService: DialogService,
  ) {
    this.isDarkMode = this.themeService.getDarkModeStatus();
    this.user = this.appService.getCurrentUser();
  }

  ngOnInit() {
    this.updateActions();
  }

  updateActions() {
    this.actions = [
      {
        label: 'User Settings',
        glyph: 'user-settings',
        clickCallback: () => {
          this.openDialog();

          /*  const profilePath = this.routeService.getAdminPath(
            AdminRouteType.Profile,
          );
          this.router.navigate([`${profilePath}`]); */
        },
        forceVisibility: false,
      },
      {
        label: 'Theme',
        glyph: this.isDarkMode ? 'dark-mode' : 'light-mode',
        clickCallback: () => {
          this.toggleTheme();
        },
        forceVisibility: false,
      },
    ];
  }

  signOut() {
    this.adminService.signOut();
  }

  valueUpdate($event: string) {
    console.log($event);
  }

  toggleMenu() {
    this.adminService.setSidebarState();
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
    this.isDarkMode = this.themeService.getDarkModeStatus();
    this.updateActions();
  }

  openDialog(): void {
    this._dialogService.open(this.confirmationDialog, {
      responsivePadding: false,
      minWidth: '55rem',
      width: '80vw',
      maxWidth: '75rem',
      minHeight: '40rem',
      ariaDescribedBy: 'fd-dialog-body-10',
      focusTrapped: true,
    });
  }
}
