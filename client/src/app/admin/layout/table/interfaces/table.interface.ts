export interface Column {
  field: string;
  header: string;
}

export interface ButtonBase {
  severity?: "info" | "success" | "warn" | "danger" | "secondary" | "contrast" | "help" | "primary";
  variant?: "text" | "outlined";
  size?: "small" | "large",
  outlined?: boolean,
  text?:boolean,
  link?: boolean,
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
  callback: (row: any) => void;
}