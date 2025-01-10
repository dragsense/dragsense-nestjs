import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouteService } from '@app/routes.service';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

import {
  DialogBodyComponent,
  DialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
  DialogService,
} from '@fundamental-ngx/core/dialog';
import { BarModule } from '@fundamental-ngx/core/bar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import {
  DynamicFormItem,
  DynamicFormValue,
  FormGeneratorComponent,
  
  FormGeneratorService,
  PlatformFormGeneratorModule,
} from '@fundamental-ngx/platform/form';
import { TeamsService } from '../teams.service';
import { catchError, finalize } from 'rxjs';
import { Team } from '../interfaces/team.interface';
import { Validators } from '@angular/forms';
import { HeperService } from '@app/heper.service';

import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { NgIf } from '@angular/common';



@Component({
  selector: 'teams-single',
  imports: [
    RouterLink,
    ListModule,
    IconComponent,
    ButtonComponent,
    ActionBarModule,
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    BarModule,
    TitleComponent,
    BusyIndicatorModule,
    MessageStripModule,
    NgIf,
    PlatformFormGeneratorModule
  ],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss',
})
export class SingleComponent {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  @ViewChild(FormGeneratorComponent) formGenerator!: FormGeneratorComponent;

  teamsPath!: string;

  loading = false;

  formCreated = false;

  questions!: DynamicFormItem[];
  teamQuestions!: DynamicFormItem[];

  team: Team | null = null;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private routeService: RouteService,
    private _dialogService: DialogService,
    private _cdr: ChangeDetectorRef,
    private teamService: TeamsService,
    private route: ActivatedRoute,
    private helperService: HeperService,
  ) {}

  async ngOnInit() {
    this.teamsPath = this.routeService.getTeamsPath();

    const teamId = this.route.snapshot.paramMap.get('id');

    if (teamId) this.fetchTeam(parseInt(teamId));
    else this.dyanmicTeamForm();
  }

  private fetchTeam(teamId: number) {
    this.loading = true;
    this.errorMessage = '';

    this.teamService
      .get(teamId)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to fetch. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.team = response;
        this.dyanmicTeamForm();
      });
  }

  /*   dyanmicMemberForm(): void {
    this.questions = [
      {
        name: 'invitation',
        message: 'Invite Memnber',
        items: [
          {
            type: 'input',
            name: 'name',
            message: 'Name',
            default: this.team?.name,
            placeholder: 'Please enter project name',
            validators: [
              Validators.required,
              Validators.max(100),
              Validators.min(3),
            ],
            guiOptions: {
              fieldColumnLayout: { XL: 6, L: 6 },
              additionalData: {
                rows: '10',
              },
            },
          },
          {
            type: 'input',
            name: 'email',
            message: 'Email',
            default: this.team?.email,
            placeholder: 'Please enter project identifier',
            validators: [
              Validators.required,
              Validators.max(100),
              Validators.min(3),
            ],
            guiOptions: {
              fieldColumnLayout: { XL: 6, L: 6 },
            },
          },
        ],
      },
    ];
  } */

  dyanmicTeamForm(): void {
    this.teamQuestions = [
      {
        name: 'team',
        message: 'Team Info',
        items: [
          {
            type: 'input',
            name: 'name',
            message: 'Name',
            default: this.team?.name,
            placeholder: 'Please enter team name',
            validators: [
              Validators.required,
              Validators.max(100),
              Validators.min(3),
            ],
            guiOptions: {
              fieldColumnLayout: { XL: 6, L: 6 },
              additionalData: {
                rows: '10',
              },
            },
          },
          {
            type: 'textarea',
            name: 'desc',
            message: 'Description',
            default: this.team?.desc,
            placeholder: 'Please enter team description',
            validators: [Validators.max(1024)],
            guiOptions: {
              column: 1,
            },
          },
        ],
      },
    ];
  }

  onFormCreated(): void {
    this.formCreated = true;
  }

  private create(values: any) {
    this.teamService
      .create(values)
      .pipe(
        catchError((error) => {
          if (error.status === 400 && error.error) {
            if (Array.isArray(error.error.message)) {
              this.errorMessage = error.error.message.join(', ');
            } else if (typeof error.error === 'string') {
              this.errorMessage = error.error;
            } else if (typeof error.error.message === 'string') {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'Creation failed. Please try again.';
            }
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again.';
          }
          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.team = response.project;
        this.successMessage = 'Team Created successfuly.';
      });
  }

  private update(id: number, values: any) {
    this.teamService
      .update(id, values)
      .pipe(
        catchError((error) => {
          if (error.status === 400 && error.error) {
            if (Array.isArray(error.error.message)) {
              this.errorMessage = error.error.message.join(', ');
            } else if (typeof error.error === 'string') {
              this.errorMessage = error.error;
            } else if (typeof error.error.message === 'string') {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'Updation failed. Please try again.';
            }
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again.';
          }
          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.team = response.project;
        this.successMessage = 'Team Updated successfuly.';
      });
  }

  async onFormSubmitted(value: DynamicFormValue): Promise<void> {
    this.loading = true;

    this.errorMessage = '';
    this.successMessage = '';

    const values = this.helperService.getLastKeys(value);

    if (this.team) this.update(this.team.id, values);
    else this.create(values);
  }

  submitForm(): void {
    this.formGenerator.submit();
  }

  openDialog(dialog: TemplateRef<any>): void {
    const dialogRef = this._dialogService.open(dialog, {
      responsivePadding: true,
      focusTrapped: true,
      verticalPadding: true,
    });

    dialogRef.afterClosed.subscribe(
      (result) => {
        this._cdr.detectChanges();
      },
      (error) => {
        this._cdr.detectChanges();
      },
    );
  }
}
