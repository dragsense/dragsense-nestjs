export interface BaseColumn {
  field: string;
  header: string;
  onClick?: (row: any) => void;
  class?: string;
}

export type RoutableColumn = BaseColumn & {
  isRoutable: true;
  isExternalLink?: boolean;
  url: string;
};

export type ExternalLinkColumn = BaseColumn & {
  isExternalLink: true;
  isRoutable?: boolean;
  url: string;
};

export type NonRoutableColumn = BaseColumn & {
  isRoutable?: false;
  isExternalLink?: false;
  url?: never;
};





export type Column = RoutableColumn | ExternalLinkColumn | NonRoutableColumn;

export interface ButtonBase {
  severity?:
    | 'info'
    | 'success'
    | 'warn'
    | 'danger'
    | 'secondary'
    | 'contrast'
    | 'help'
    | 'primary';
  variant?: 'text' | 'outlined';
  size?: 'small' | 'large';
  outlined?: boolean;
  text?: boolean;
  link?: boolean;
}

export interface ButtonWithIcon extends ButtonBase {
  label?: string;
  icon: string;
}

export interface ButtonWithText extends ButtonBase {
  label: string;
  icon?: string;
}

export interface Action {
  button: ButtonWithText | ButtonWithIcon;
  onClick: (row: any) => void;
}
