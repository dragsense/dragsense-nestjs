import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BaseDynamicFormGeneratorControl,
  TextAreaComponent,
  dynamicFormFieldProvider,
  dynamicFormGroupChildProvider,
} from '@fundamental-ngx/platform/form';

@Component({
  selector: 'app-textarea',
  viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
  imports: [FormsModule, ReactiveFormsModule, TextAreaComponent],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTextareaComponent extends BaseDynamicFormGeneratorControl {
  constructor() {
    super();
  }
}
