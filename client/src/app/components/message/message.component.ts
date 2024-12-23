import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  size,
  colors,
  colorVariants,
  variant,
  borderStyle,
  roundedSize,
} from '../types/shared.types';
import { messageTypes } from '../types/message.types';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-message',
  imports: [SharedModule, SafeHtmlPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit {
  @Input() variant: variant | 'borderless' = 'text';
  @Input() color: colors = 'red';
  @Input() colorVariant: colorVariants = 100;
  @Input() borderStyle: borderStyle = 'solid';
  @Input() rounded: roundedSize = 'md';
  @Input() className: string = '';
  @Input() iconClasses: string = '';
  @Input() size: size = 'sm';
 
  @Input() closable: boolean = false;
  @Input() open: boolean = true;
  @Input() fullWidth: boolean = false;

  @Input() type: messageTypes | null = null;
  @Input() showIcon: boolean = false;
  @Input() iconType: 'outlined' | '' = '';

  @Input() iconClass: string | null = null;
  @Input() iconHTML: string | null = null;

  classes: string = '';
  gapClass: string = 'gap-md';
  icon: string = '';
  closeIcon: string = '';


  @Output() onInput = new EventEmitter<string>();

  ngOnInit(): void {
    const colorVariant = this.colorVariant !== 0 ? `-${this.colorVariant}` : '';
    const color = `${this.color}${colorVariant}`;

    const alternativeVariant = this.calculateInverseVariant(this.colorVariant);

    const alternativeColor = `${this.color}${alternativeVariant}`;

    this.classes = this.calculateClasses(color, alternativeColor);

    this.gapClass =
      this.size === 'sm' ? `gap-1` : this.size === 'md' ? `gap-1.5` : `gap-2`;

    if (this.showIcon) {
      if (this.iconClass) this.icon = `<i class="${this.iconClass}"></i>`;
      else this.icon = this.getIconHTML(color, alternativeColor);
    }

    if (this.closable)
      this.closeIcon = this.getCloseIcon(color, alternativeColor);
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onInput.emit(input.value);
  }

  handleClose(): void {
    if (this.closable) this.open = false;
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
    let classes =
      this.size === 'sm'
        ? `text-sm`
        : this.size === 'md'
          ? `text-base`
          : `text-lg`;

    classes +=
      this.colorVariant > 500
        ? ` text-${color} dark:text-${alternativeColor}`
        : ` text-${alternativeColor} dark:text-${color}`;

    if (this.variant !== 'text') {
      const borderStyle = `border-${this.borderStyle}`;

      const bGClasses =
        this.colorVariant > 500
          ? `bg-${alternativeColor} dark:bg-${color}`
          : `bg-${color} dark:bg-${alternativeColor}`;

      const borderClasses =
        this.colorVariant > 500
          ? `border border-${color} dark:border-${alternativeColor}`
          : `border border-${alternativeColor} dark:border-${color}`;

      classes +=
        this.variant === 'borderless'
          ? ` ${bGClasses}`
          : this.variant === 'filled'
            ? ` ${bGClasses} ${borderClasses} ${borderStyle}`
            : ` ${borderClasses} ${borderStyle}`;

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
    }

    classes += this.fullWidth ? ` w-full` : ` max-w-max`;

    return `${classes} ${this.className}`;
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

  private getIconMappings(
    color: string,
    alternativeColor: string,
  ): { [key: string]: string } {
    let classes = this.getIconSizeClasses();

    classes +=
      this.colorVariant > 500
        ? ` fill-${color} dark:fill-${alternativeColor}`
        : ` fill-${alternativeColor} dark:fill-${color}`;

    return {
      erroroutlined: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960">
      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
      </svg>`,
      error: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960">
      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
      </svg>`,
      infooutlined: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
      info: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`,
      warningoutlined: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg>`,
      successoutline: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes} viewBox="0 -960 960 960"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`,
    };
  }

  private getIconHTML(color: string, alternativeColor: string): string | '' {
    if (this.showIcon) {
      const iconMappings = this.getIconMappings(color, alternativeColor);
      return iconMappings[this.type + this.iconType] || '';
    }
    return this.iconHTML || '';
  }

  private getCloseIcon(color: string, alternativeColor: string): string | '' {
    let classes = this.getIconSizeClasses();

    classes +=
      this.colorVariant > 500
        ? ` fill-${color} dark:fill-${alternativeColor}`
        : ` fill-${alternativeColor} dark:fill-${color}`;

    return `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
  }
}
