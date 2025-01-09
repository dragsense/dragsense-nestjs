import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MainComponent } from '../layout/main/main.component';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import {
  SettingsGeneratorComponent,
  SettingsGeneratorModule,
  SettingsModel,
} from '@fundamental-ngx/platform/settings-generator';
import { ProfileService } from './profile.service';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { AppService } from '@app/app.service';
import { SelectItem } from '@fundamental-ngx/cdk';
import { Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';

import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import {
  catchError,
  finalize,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { User } from '@app/auth/interfaces/user.interface';
import { DialogRef } from '@fundamental-ngx/core/dialog';

import {
  BarComponent,
  BarLeftDirective,
  BarRightDirective,
  ButtonBarComponent,
} from '@fundamental-ngx/core/bar';

import {
  MessagePopoverComponent,
  MessagePopoverFormWrapperComponent,
  PlatformMessagePopoverModule,
} from '@fundamental-ngx/platform/message-popover';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MainComponent,
    ButtonComponent,
    ActionBarModule,
    SettingsGeneratorComponent,
    SettingsGeneratorModule,
    NgIf,
    BusyIndicatorModule,
    FdpFormGroupModule,
    MessageStripModule,
    BarComponent,
    BarRightDirective,
    BarLeftDirective,
    ButtonBarComponent,
    MessagePopoverComponent,
    PlatformMessagePopoverModule,
    MessagePopoverFormWrapperComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService],
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  @Input() dialog!: DialogRef;

  @ViewChild(SettingsGeneratorComponent)
  settingsGenerator!: SettingsGeneratorComponent;

  schema!: SettingsModel;
  isLoading = true;
  isSaving = false;

  submitError: string = '';

  firstnameError: string = '';
  submitSuccess: string = '';

  constructor(
    private readonly profileService: ProfileService,
    private readonly appService: AppService,
    private readonly _cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.initializeProfile();

    this._cdr.detectChanges();
  }

  private initializeProfile(): void {
    this.submitError = '';

    this.profileService
      .getProfile()
      .pipe(
        catchError((error) => {
          this.submitError = 'Error fetching profile. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.isSaving = false;
        }),
      )
      .subscribe((response) => {
        this.buildSchema(response.user, response.profile);
        this.isLoading = false;
      });
  }

  private buildSchema(user: User, profile: any): void {
    const themes: SelectItem[] = [
      {
        label: 'Light',
        value: 'light',
        icon: 'user',
      },
      {
        label: 'Dark',
        value: 'dark',
        icon: 'dark-mode',
      },
    ];

    this.schema = {
      appearance: 'sidebar',
      sidebarWidth: {
        minWidth: '20rem',
        width: '20rem',
        maxWidth: '20rem',
      },
      items: [
        {
          title: `User Account (${user.firstname})`,
          description: 'Update your personal details',
          id: 'information',
          thumbnail: {
            avatar: of({
              image: profile.thumbnail,
              circle: true,
              colorAccent: 10,
              label: user.firstname,
            }),
          },
          groups: [
            {
              title: 'User Information',
              id: 'basicInfo',
              items: [
                {
                  name: 'email',
                  message: user.emailVerified
                    ? 'Email'
                    : ' Email (Not Verified)',
                  type: 'input',
                  controlType: 'email',
                  default: user.email,
                  validators: [Validators.required, Validators.email],
                },
                {
                  name: 'firstname',
                  message: 'First Name',
                  type: 'input',
                  controlType: 'text',
                  default: user.firstname,
                },
                {
                  name: 'lastname',
                  message: 'Last Name',
                  type: 'input',
                  controlType: 'text',
                  default: user.lastname,
                  validators: [Validators.required, Validators.min(3)],
                  guiOptions: {},
                },
                {
                  name: 'bio',
                  message: 'Bio',
                  type: 'textarea',
                  default: profile.bio,
                },
                {
                  name: 'dateOfBirth',
                  message: 'Date of Birth',
                  type: 'datepicker',
                  default: profile.dateOfBirth,
                },
              ],
            },
            {
              title: 'Contact',
              id: 'contact',
              items: [
                {
                  name: 'phone',
                  message: 'Phone',
                  type: 'input',
                  controlType: 'text',
                  default: profile.phone,
                },
                {
                  name: 'website',
                  message: 'Website',
                  type: 'input',
                  controlType: 'text',
                  default: profile.website,
                },
                {
                  name: 'location',
                  message: 'Location',
                  type: 'input',
                  controlType: 'text',
                  default: profile.location,
                },
              ],
            },
            {
              title: 'Social',
              id: 'social',

              items: [
                {
                  name: 'linkedin',
                  message: 'LinkedIn',
                  type: 'input',
                  controlType: 'text',
                  placeholder: 'Enter linked profile url',
                  default: profile.linkedin,
                },
                {
                  name: 'X',
                  message: 'X',
                  type: 'input',
                  controlType: 'text',
                  placeholder: 'Enter x profile url',
                  default: profile.x,
                },
                {
                  name: 'github',
                  message: 'GitHub',
                  type: 'input',
                  controlType: 'text',
                  placeholder: 'Enter github  url',
                  default: profile.github,
                },
              ],
            },
          ],
        },
        {
          title: 'Appearance',
          description: 'Configure theme settings',
          id: 'appearance',
          thumbnail: {
            icon: 'globe',
          },
          groups: [
            {
              title: 'Theme mode',
              id: 'themeMode',
              items: [
                {
                  type: 'theme-list',
                  name: 'themeMode',
                  message: '',
                  choices: themes,
                  default: profile.themeMode,
                  guiOptions: {
                    noLabelLayout: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }

  private getLastKeys = (obj: any, result: Record<string, any> = {}): any => {
    for (const key in obj) {
      if (
        obj[key] &&
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key])
      ) {
        if (
          key.toLowerCase().includes('date') &&
          obj[key].hasOwnProperty('year')
        ) {
          const { year, month, day, hour, minute, second } = obj[key];
          const date = new Date(year, month - 1, day, hour, minute, second);
          result[key] = date;
        } else {
          this.getLastKeys(obj[key], result);
        }
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  };

  saveProfile(): void {
    this.submitError = '';
    this.submitSuccess = '';

    this.settingsGenerator
      .submit()
      .pipe(
        take(1),
        switchMap((result: any) => {
          const values = this.getLastKeys(result);
          this.isSaving = true;
          return this.profileService.saveProfile(values).pipe(
            tap((response) => {
              this.appService.updateProfile({
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                themeMode: values.themeMode,
              });

              this.submitSuccess =
                'Profile updated successfully! ' + response?.message || '';
            }),
            catchError((error) => {
              this.submitError = 'Error updating profile. Please try again.';
              return throwError(() => error);
            }),
            finalize(() => {
              this.isSaving = false;
            }),
          );
        }),
      )
      .subscribe({
        next: () => console.log('hello'),
      });
  }
}
