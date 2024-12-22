import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  size,
  colors,
  colorVaraints,
  borderStyle,
  roundedSize,
} from '../types/shared.types';
import { inputLayputs, inputTypes, inputVariant } from '../types/input.types';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { TextComponent } from '@components/text/text.component';

@Component({
  selector: 'app-input',
  imports: [NgIf, TextComponent, NgTemplateOutlet],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() id: string = 'input';
  @Input() variant: inputVariant = 'outlined';
  @Input() color: colors = 'zinc';
  @Input() colorVaraint: colorVaraints = 400;
  @Input() ringColor: colors = 'zinc';
  @Input() className: string = '';
  @Input() size: size = 'md';
  @Input() fullWidth: boolean = false;
  @Input() rounded: roundedSize = 'md';
  @Input() borderStyle: borderStyle = 'solid';
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "Enter Input";
  @Input() type: inputTypes = 'text';
  @Input() label: string | undefined = 'Label';
  @Input() layout: inputLayputs = 'hor';

  @Output() onInput = new EventEmitter<string>();

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onInput.emit(input.value);
  }


  getClasses(): string {

    
    const colorVaraint = this.colorVaraint !== 0 ? `-${this.colorVaraint}` : '';
    const color =  `${this.ringColor}${colorVaraint}`;

    const bGClasses = `bg-${this.color}-100 dark:bg-${this.color}-900`;
    const textColor = `text-slate-900 dark:text-slate-100`;

    const borderStyle = `border-${this.borderStyle}`;

    let classes =
     this.variant === 'outlined'
          ? `border border-zinc-200 dark:border-zinc-800 ${borderStyle} ${bGClasses} ${textColor}`
          : `border-${color} ${borderStyle} ${bGClasses} ${textColor}`;

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

    return `${baseClasses} ${classes} ${this.className}`;
  }
}
