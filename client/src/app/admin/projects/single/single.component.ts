import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { RouteService } from '../../../routes.service';
import { PlatformType, Project } from '../interfaces/project.interface';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { FormModule } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';

import { ProjectService } from '../project.service';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
  BarComponent,
  BarRightDirective,
  ButtonBarComponent,
} from '@fundamental-ngx/core/bar';

import {
  DynamicFormItem,
  DynamicFormValue,
  FormGeneratorComponent,
  FormGeneratorService,
  PlatformFormGeneratorModule,
} from '@fundamental-ngx/platform/form';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';

import { catchError, finalize, of } from 'rxjs';
import { CustomTextareaComponent } from '@components/textarea/textarea.component';

@Component({
  selector: 'app-project',
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    ActionBarModule,
    ButtonComponent,
    BarComponent,
    ButtonBarComponent,
    BarRightDirective,
    FormModule,
    SelectModule,
    RadioButtonComponent,
    PlatformButtonModule,
    FormGeneratorComponent,
    PlatformFormGeneratorModule,
    MessageStripModule,
    BusyIndicatorModule
  ],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss',
})
export class SingleComponent {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  @ViewChild(FormGeneratorComponent) formGenerator!: FormGeneratorComponent;

  loading = false;

  formCreated = false;

  project: Project | null = null;

  questions!: DynamicFormItem[];

  projectsPath!: string;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private routeService: RouteService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private readonly _formGeneratorService: FormGeneratorService,
  ) {
    this._formGeneratorService.addComponent(CustomTextareaComponent, [
      'ds-textarea',
    ]);
  }

  async ngOnInit() {
    this.projectsPath = this.routeService.getProjectsPath();

    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId) this.fetchProject(parseInt(projectId));
    else this.dyanmicProjectForm();
  }

  private fetchProject(projectId: number) {
    this.loading = true;
    this.errorMessage = '';

    this.projectService
      .get(projectId)
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
        this.project = response;
        this.dyanmicProjectForm();
      });
  }

  dyanmicProjectForm(): void {
    this.questions = [
      {
        name: 'indentity',
        message: 'Project Identity',
        items: [
          {
            type: 'input',
            name: 'name',
            message: 'Name',
            default: this.project?.name,
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
            name: 'identifier',
            message: 'Identifier',
            default: this.project?.identifier,
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
      {
        name: 'detail',
        message: 'Project Description',
        items: [
          {
            type: 'ds-textarea',
            name: 'desc',
            message: 'Description',
            default: this.project?.desc,
            placeholder: 'Please enter project description',
            validators: [Validators.max(1024)],
            guiOptions: {
              column: 1,
            },
          },
        ],
      },
      {
        name: 'serverInfo',
        message: 'Server Information',
        items: [
          {
            type: 'input',
            name: 'serverUrl',
            message: 'Server URL',
            default: this.project?.serverUrl,
            placeholder: 'Please enter api server url',
            validators: [Validators.required],
          },
          {
            type: 'input',
            name: 'apiPrefix',
            message: 'API Prefix',
            default: this.project?.apiPrefix || 'api',
            placeholder: 'Please enter api prefix',
            validators: [
              Validators.required,
              Validators.max(30),
              Validators.min(3),
            ],
            guiOptions: {
              fieldColumnLayout: { XL: 3, L: 3 },
            },
          },
        ],
      },
      {
        type: 'list',
        name: 'apiVer',
        message: 'API Version',
        validators: [Validators.required],
        default: this.project?.apiVer || 'v1',
        choices: () =>
          of([
            {
              label: 'Version 1',
              value: 'v1',
            },
          ]),
        guiOptions: {
          fieldColumnLayout: { XL: 3, L: 3 },
        },
      },
    ];
  }

  onFormCreated(): void {
    this.formCreated = true;
  }

  private create(values: any) {
    this.projectService
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
        this.project = response.project;
        this.successMessage = 'Project Created successfuly.';
      });
  }

  private update(id: number, values: any) {
    this.projectService
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
        this.project = response.project;
        this.successMessage = 'Project Updated successfuly.';
      });
  }

  async onFormSubmitted(value: DynamicFormValue): Promise<void> {
    this.loading = true;

    const values = this.projectService.getLastKeys(value);
    this.errorMessage = '';
    this.successMessage = '';

    if (this.project) this.update(this.project.id, values);
    else this.create(values);
  }

  submitForm(): void {
    this.formGenerator.submit();
  }
}
