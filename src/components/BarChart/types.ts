export enum BarType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface BarData {
  id: string;
  label: string;
  value: number;
  type: BarType;
}
