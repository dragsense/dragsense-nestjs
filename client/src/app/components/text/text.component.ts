import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  size,
  colors,
  colorVaraints,
} from '../types/shared.types';

@Component({
  selector: 'app-text',
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent {
  @Input() color: colors = 'slate';
  @Input() colorVaraint: colorVaraints = 100;
  @Input() className: string = '';
  @Input() size: size = 'md';
  @Input() opacity: number = 1;

  @Output() onInput = new EventEmitter<string>();

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onInput.emit(input.value);
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

  getClasses(): string {
    const colorVaraint = this.colorVaraint !== 0 ? `-${this.colorVaraint}` : '';
    const color = `${this.color}${colorVaraint}`;

    const alternativeVariant = this.calculateInverseVariant(this.colorVaraint);

    const alternativeColor = `${this.color}${alternativeVariant}`;

    let classes =
      this.colorVaraint > 500
        ? `text-${color} dark:text-${alternativeColor}`
        : `text-${alternativeColor} dark:text-${color}`;

    classes +=
      this.size === 'sm'
        ? ` text-sm`
        : this.size === 'md'
          ? ` text-base`
          : ` text-lg`;

    return `${classes} ${this.className}`;
  }
}
