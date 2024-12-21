import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  variant,
  size,
  colors,
  colorVaraints,
  roundedSize,
  borderStyle,
} from '../types/button.types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: variant = 'filled';
  @Input() color: colors = 'ds-primary';
  @Input() colorVaraint: colorVaraints = 0;
  @Input() className: string = '';
  @Input() size: size = 'md';
  @Input() fullWidth: boolean = false;
  @Input() rounded: roundedSize = 'md';
  @Input() borderStyle: borderStyle = 'solid';
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

  private calculateHoverVariant = (
    variant: number,
    isInverse: boolean = false,
  ): number => {
    if (variant === 0) return 400;

    if (isInverse) {
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

      const v = darkModeVariantMap[variant] || variant;

      return this.calculateHoverVariant(v);
    } else {
      // Standard hover variant adjustment
      return variant >= 50 && variant < 500
        ? variant + (variant === 50 ? 50 : 100)
        : variant - 100;
    }
  };

  getClasses(): string {
    const colorVaraint = this.colorVaraint !== 0 ? `-${this.colorVaraint}` : '';
    const color = `${this.color}${colorVaraint}`;

    const hoverFilledBgColorVaraint = this.calculateHoverVariant(
      this.colorVaraint,
    );

    const hoverFilledBgColor = `${this.color}-${hoverFilledBgColorVaraint}`;

    const hoverBGColorVaraint = this.calculateHoverVariant(
      this.colorVaraint,
      true,
    );

    const hoverBgColor = `${this.color}-${hoverBGColorVaraint}`;

    const hoverBGClasses =
      this.colorVaraint > 500
        ? `hover:bg-${hoverBgColor} hover:dark:bg-${hoverFilledBgColor}`
        : `hover:bg-${hoverFilledBgColor} hover:dark:bg-${hoverBgColor}`;

    const hoverFilledTextColor = `text-slate-50 dark:text-slate-900`;
    const hoverTextColor = `text-slate-900 hover:text-slate-950 dark:text-slate-50 hover:dark:text-slate-100`;

    const borderStyle = `border-${this.borderStyle}`;

    let classes =
      this.variant === 'filled'
        ? `bg-${color} hover:bg-${hoverFilledBgColor} ${hoverFilledTextColor}`
        : this.variant === 'outlined'
          ? `border border-${color} ${borderStyle} ${hoverBGClasses} ${hoverTextColor}`
          : `${hoverBGClasses} ${hoverTextColor}`;

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

    return `transition font-medium ${classes} ${this.className}`;
  }
}
