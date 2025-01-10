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
  type?:
    | 'emphasized'
    | 'ghost'
    | 'positive'
    | 'attention'
    | 'transparent'
    | 'negative';
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

export interface ActionPopOver {
  title: string;
  subHeading: string;
}

export interface Action {
  button: ButtonWithText | ButtonWithIcon;
  popover?: ActionPopOver;
  command: (row: any) => void;
}
