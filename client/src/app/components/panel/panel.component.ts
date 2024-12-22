import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  variant,
  size,
  colors,
  colorVaraints,
  borderStyle,
  roundedSize,
} from '../types/shared.types';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
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
  
    private calculateHoverVariant = (variant: number): number => {
      if (variant === 0) return 400;
  
      return variant >= 50 && variant < 500
        ? variant + (variant === 50 ? 50 : 100)
        : variant - 100;
    };
  
    getClasses(): string {
      const colorVaraint = this.colorVaraint !== 0 ? `-${this.colorVaraint}` : '';
      const color = `${this.color}${colorVaraint}`;
  
      const hoverFilledBgColorVaraint = this.calculateHoverVariant(
        this.colorVaraint,
      );
  
      const hoverFilledBgColor = `${this.color}-${hoverFilledBgColorVaraint}`;
      const hoverBGClasses = `hover:bg-${this.color}-100 hover:dark:bg-${this.color}-900`;
  
      const hoverFilledTextColor = `text-slate-100 dark:text-slate-900`;
      const hoverTextColor = `text-slate-900 hover:text-slate-800 dark:text-slate-100 hover:dark:text-slate-200`;
  
      const borderStyle = `border-${this.borderStyle}`;
  
      let classes =
        this.variant === 'filled'
          ? `bg-${color} hover:bg-${hoverFilledBgColor} ${hoverFilledTextColor}`
          : this.variant === 'outlined'
            ? `border border-${color} ${borderStyle} ${hoverBGClasses} ${hoverTextColor}`
            : `border-${color} ${borderStyle} ${hoverBGClasses} ${hoverTextColor}`;
  
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
  
      let baseClasses = `transition focus:outline-none focus:ring-1 focus:ring-${color} focus:ring-offset-1`;
  
      return `${baseClasses} ${classes} ${this.className}`;
    } 
  
}
