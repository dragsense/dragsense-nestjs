import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  size,
  colors,
  colorVariants,
  borderStyle,
  roundedSize,
} from '../types/shared.types';
import {
  inputIconPositions,
  inputIcons,
  inputTypes,
  inputVariant,
} from '../types/input.types';
import { NgTemplateOutlet } from '@angular/common';
import { MessageComponent } from '@components/message/message.component';
import { SharedModule } from '../shared/shared.module';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';

@Component({
  selector: 'app-input',
  imports: [SharedModule, SafeHtmlPipe, MessageComponent, NgTemplateOutlet],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() id: string = 'input';
  @Input() name!: string;
  @Input() variant: inputVariant = 'outlined';
  @Input() color: colors = 'zinc'; 
  @Input() colorVariant: colorVariants = 100;
  @Input() ringColor: colors = 'zinc';
  @Input() className: string = '';
  @Input() labelClass: string = '';
  @Input() errorClass: string = '';
  @Input() size: size = 'md';
  @Input() fullWidth: boolean = false;
  @Input() rounded: roundedSize = 'md';
  @Input() borderStyle: borderStyle = 'solid';
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Enter Input Here';
  @Input() type: inputTypes = 'text';
  @Input() label: string | undefined;
  @Input() layout: 'vertical' | undefined;

  @Input() iconPosition: inputIconPositions = 'leading';
  @Input() iconType: inputIcons | null = null;
  @Input() iconClass: string | null = null;
  @Input() iconHTML: string | null = null;

  @Input() required: boolean = false;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() pattern: string | null = null;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() errorMessage: string | undefined;

  @Input() requiredMessage: string = 'This field is required.';
  @Input() emailMessage: string = 'Please enter a valid email address.';
  @Input() patternMessage: string = 'Invalid format.';
  @Input() minLengthMessage: string = `Minimum length required is {minLength}.`;
  @Input() maxLengthMessage: string = `Maximum length allowed is {maxLength}.`;
  @Input() minValueMessage: string = 'Minimum value allowed is {min}.';
  @Input() maxValueMessage: string = 'Maximum value allowed is {max}.';

  error: string | null = null;
  classes: string = '';
  icon: string = '';
  iconClasses: string = '';
  hasIcon: boolean = false;

  private emailPattern: RegExp;

  @Output() onInput = new EventEmitter<string>();

  constructor() {
    this.emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  }

  ngOnInit(): void {
    this.hasIcon = !!(this.iconType || this.iconClass || this.iconHTML);

    const colorVariant = this.colorVariant !== 0 ? `-${this.colorVariant}` : '';
    const color = `${this.color}${colorVariant}`;

    const alternativeVariant = this.calculateInverseVariant(this.colorVariant);

    const alternativeColor = `${this.color}${alternativeVariant}`;

    this.classes = this.calculateClasses(color, alternativeColor);

    if (this.hasIcon) {
      this.iconClasses = this.calculateIconClasses();

      if (this.iconType || this.iconHTML) this.icon = this.getIconHTML();
      else if (this.iconClass) this.icon = `<i class="${this.iconClass}"></i>`;
    }
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.error = null;

    if (this.required && !value) {
      this.error = this.errorMessage || this.requiredMessage;
    } else if (this.type === 'email' && !this.emailPattern.test(value)) {
      this.error = this.errorMessage || this.emailMessage;
    } else if (this.minLength !== null && value.length < this.minLength) {
      this.error =
        this.errorMessage ||
        this.minLengthMessage.replace('{minLength}', String(this.minLength));
    } else if (this.maxLength !== null && value.length > this.maxLength) {
      this.error =
        this.errorMessage ||
        this.maxLengthMessage.replace('{maxLength}', String(this.maxLength));
    } else if (this.pattern && !new RegExp(this.pattern).test(value)) {
      this.error = this.errorMessage || this.patternMessage;
    } else if (this.type === 'number') {
      const numericValue = parseFloat(value);
      if (this.min !== null && numericValue < this.min) {
        this.error =
          this.errorMessage ||
          this.minValueMessage.replace('{min}', String(this.min));
      } else if (this.max !== null && numericValue > this.max) {
        this.error =
          this.errorMessage ||
          this.maxValueMessage.replace('{max}', String(this.max));
      }
    }

    if (!this.error) {
      this.onInput.emit(value);
    }
  }

  private calculateInverseVariant = (variant: number): string => {
    const darkModeVariantMap: { [key: number]: number } = {
      50: 950,
      100: 900,
      200: 800,
      300: 700,
      400: 600,
      500: 500,
      600: 400,
      700: 300,
      800: 200,
      900: 100,
      950: 50,
    };

    return variant !== 0 ? `-${darkModeVariantMap[variant] || variant}` : '';
  };

  private calculateClasses(color: string, alternativeColor: string): string {
    const borderStyle = `border-${this.borderStyle}`;

    let classes =
      this.colorVariant > 500
        ? ` text-${color} dark:text-${alternativeColor}`
        : ` text-${alternativeColor} dark:text-${color}`;

    let bGClasses =
      this.colorVariant > 500
        ? `bg-${alternativeColor} dark:bg-${color}`
        : `bg-${color} dark:bg-${alternativeColor}`;

    const borderClasses =
      this.colorVariant > 500
        ? `border border-${alternativeColor} dark:border-${color}`
        : `border border-${color} dark:border-${alternativeColor}`;

    classes +=
      this.variant === 'filled'
        ? ` ${borderClasses} ${borderStyle} ${bGClasses}`
        : this.variant === 'borderless'
          ? ` ${borderClasses} ${borderStyle} ${bGClasses}`
          : this.variant === 'outlined'
            ? ` ${borderStyle} ${bGClasses}`
            : ` ${borderStyle} ${bGClasses}`;

    classes +=
      this.size === 'sm'
        ? ` text-sm px-2 py-1`
        : this.size === 'md'
          ? ` text-base px-3 py-2`
          : ` text-lg px-4 py-3`;

    classes +=
      this.rounded === 'sm'
        ? ` rounded-sm`
        : this.rounded === 'md'
          ? ` rounded-md`
          : this.rounded === 'lg'
            ? ` rounded-lg`
            : this.rounded === 'full'
              ? ` rounded-full`
              : ``;

    classes += this.fullWidth ? ` w-full` : ``;

    let baseClasses = `transition-shadow focus:outline-none focus:ring-1 focus:ring-${color}`;

    if (this.hasIcon)
      classes +=
        this.iconPosition === 'leading'
          ? this.size === 'sm'
            ? ' pl-6'
            : this.size === 'md'
              ? ' pl-8'
              : ' pl-10'
          : this.size === 'sm'
            ? ' pr-6'
            : this.size === 'md'
              ? ' pr-8'
              : ' pr-10';

    return `${baseClasses} ${classes} ${this.className}`;
  }

  private calculateIconClasses(): string {
    let classes = this.getIconSizeClasses();
    classes += ` text-${this.color}-500`;

    classes +=
      this.size === 'sm'
        ? ` text-sm mx-1 py-1`
        : this.size === 'md'
          ? ` text-base mx-2 py-2`
          : ` text-lg mx-3 py-3`;

    return `overflow-hidden absolute flex items-center ${classes}`;
  }

  private getIconSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'w-3.5';
      case 'md':
        return 'w-4';
      case 'lg':
        return 'w-5';
      default:
        return 'w-4';
    }
  }

  private getIconMappings(): { [key: string]: string } {
    let classes = this.getIconSizeClasses();
    classes += ` fill-${this.color}-500`;
    return {
      emailOutline: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960">
       <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
      </svg>`,
      email: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960">
       <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/>
       </svg>`,

      password: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960">
      <path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z"/>
      </svg>`,
      phoneOutline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="${classes}">
      <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
      </svg>`,
      phone: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960">
      // <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"/>
      </svg>`,
    };
  }

  private getIconHTML(): string | '' {
    if (this.iconType) {
      const iconMappings = this.getIconMappings();
      return iconMappings[this.iconType] || '';
    }
    return this.iconHTML || '';
  }
}
